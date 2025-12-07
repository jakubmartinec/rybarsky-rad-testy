import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { getTicketAdmin, getParkingLotAdmin, updateTicket } from '@/lib/db';
import ParkingReceipt from '@/components/pdf/ParkingReceipt';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;

    // Získej ticket
    const ticket = await getTicketAdmin(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: 'Lístek nenalezen' }, { status: 404 });
    }

    // Zkontroluj, že lístek je zaplacený
    if (ticket.status !== 'paid') {
      return NextResponse.json(
        { error: 'Lístek není zaplacený' },
        { status: 400 }
      );
    }

    // Získej parkoviště
    const parkingLot = await getParkingLotAdmin(ticket.parkingLotId);
    if (!parkingLot) {
      return NextResponse.json(
        { error: 'Parkoviště nenalezeno' },
        { status: 404 }
      );
    }

    // Označ, že doklad byl stažen
    if (!ticket.receiptDownloaded) {
      await updateTicket(ticketId, { receiptDownloaded: true });
    }

    // Generuj PDF
    const stream = await renderToStream(
      ParkingReceipt({ ticket, parkingLot })
    );

    // Převeď stream na buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Vrať PDF
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="parkovaci-listek-${ticket.licensePlate}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating receipt:', error);
    return NextResponse.json(
      { error: 'Chyba při generování dokladu' },
      { status: 500 }
    );
  }
}
