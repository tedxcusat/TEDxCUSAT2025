type Props = {
  name: string;
  role: string;
  phone: string;
};

export default function ContactCard({ name, role, phone }: Props) {
  return (
    <div className="border border-white/30 p-6">
      <p className="font-clash text-[30.55px] tracking-[-2%] text-white">
        {name}
      </p>
      <p className="text-sm text-white/70">{role}</p>
      <p className="mt-2 text-white">{phone}</p>
    </div>
  );
}
