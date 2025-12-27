import ContactCard from "./ContactCard";

export default function Footer() {
  return (
<footer className="bg-black text-white pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-16 px-8 py-20">
        <div>
         <h3 className="font-orbitron text-[48px] tracking-[-2%]">
  Got a Question?
</h3>

          <div className="mt-8 space-y-6">
            <ContactCard
              name="IVINE JOJU"
              role="Organizer – TEDxCUSAT26"
              phone="+91 9895545390"
            />
            <ContactCard
              name="IVINE JOJU"
              role="Organizer – TEDxCUSAT26"
              phone="+91 9895545390"
            />
          </div>
        </div>

        <div>
         <h3 className="font-orbitron text-[42px] tracking-[5%]">
  See You there!
</h3>

<p className="font-clash text-[30.55px] tracking-[-2%] text-white">
            Seminar Complex, CUSAT, University Road, South Kalamassery,
            Kalamassery, Ernakulam, Kochi, Kerala 682022.
          </p>

          <div className="mt-6 h-[250px] w-full overflow-hidden rounded">
            {/* Google Maps embed */}
            <iframe
              className="h-full w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Seminar+Complex+CUSAT&output=embed"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/20 px-8 py-6">
        <span className="font-clash text-[27.63px] font-semibold">
          TEDXCUSAT’26
        </span>
        <span>©TEDxCUSAT’26</span>
        <span className="flex gap-4">FOLLOW US ON.</span>
      </div>
    </footer>
  );
}
