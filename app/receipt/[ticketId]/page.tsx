import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function ReceiptPage({ params }: PageProps) {
  const { ticketId } = await params;

  // Redirect na API endpoint pro stažení PDF
  redirect(`/api/receipt/${ticketId}`);
}
