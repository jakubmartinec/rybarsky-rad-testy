interface ValidityInfoProps {
  validUntil: string; // už formátované - "úterý 27.5. 9:41"
}

export default function ValidityInfo({ validUntil }: ValidityInfoProps) {
  return (
    <p className="text-[14px] text-[#6B7280] text-center mt-4 mb-8">
      Lístek bude platit do {validUntil}
    </p>
  );
}
