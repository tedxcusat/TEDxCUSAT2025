type Props = {
  name: string;
  role: string;
  phone: string;
};

export default function ContactCard({ name, role, phone }: Props) {
  return (
    <div className="border border-white/40 px-5 py-4 w-full max-w-[380px]">
      <p className="font-clash text-2xl md:text-[30.55px] tracking-[-2%] text-[#EB0028]">
        {name}
      </p>

      <p className="mt-1 font-clash text-sm md:text-[16px] text-white/70">
        {role}
      </p>

      <div className="mt-3 flex items-center gap-2 font-clash text-sm md:text-[16px] text-white">
        <span>📞</span>
        <span>{phone}</span>
      </div>
    </div>
  );
}