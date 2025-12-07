export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-4">404</h1>
        <p className="text-[#6B7280] text-lg">Parkoviště nenalezeno</p>
        <p className="text-[#6B7280] text-sm mt-2">
          Zkontrolujte prosím QR kód a zkuste to znovu
        </p>
      </div>
    </div>
  );
}
