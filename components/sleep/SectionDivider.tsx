export default function SectionDivider() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7C5CFF]/[0.03] to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/[0.15] to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full border border-[#7C5CFF]/[0.1]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#7C5CFF]/[0.15]" />
    </div>
  );
}
