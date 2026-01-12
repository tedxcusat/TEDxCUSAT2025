"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

type CoreMember = {
  name: string;
  role: string;
  image: string;
};

type WebMember = {
  name: string;
  image: string;
  github?: string;
  linkedin?: string;
};

const coreTeam: CoreMember[] = [
  { name: "Person 1", role: "Organizer", image: "/team/placeholder.jpg" },
  { name: "Person 2", role: "Organizer", image: "/team/placeholder.jpg" },
  { name: "Person 3", role: "Staff Coordinator", image: "/team/placeholder.jpg" },
  { name: "Person 4", role: "Tech Lead", image: "/team/placeholder.jpg" },
  { name: "Person 5", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 6", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 7", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 8", role: "Media Lead", image: "/team/placeholder.jpg" },
  { name: "Person 9", role: "Media Lead", image: "/team/placeholder.jpg" },
  { name: "Person 10", role: "Production Lead", image: "/team/placeholder.jpg" },
  { name: "Person 11", role: "Production Lead", image: "/team/placeholder.jpg" },
  { name: "Person 12", role: "Curation Lead", image: "/team/placeholder.jpg" },
  { name: "Person 13", role: "Curation Lead", image: "/team/placeholder.jpg" },
  { name: "Person 14", role: "Content Lead", image: "/team/placeholder.jpg" },
  { name: "Person 15", role: "Outreach Lead", image: "/team/placeholder.jpg" },
  { name: "Person 16", role: "Outreach Lead", image: "/team/placeholder.jpg" },
  { name: "Person 17", role: "Sponsorship Lead", image: "/team/placeholder.jpg" },
  { name: "Person 18", role: "Sponsorship Lead", image: "/team/placeholder.jpg" },
  { name: "Person 19", role: "Treasurer", image: "/team/placeholder.jpg" },
];

const webTeam: WebMember[] = [
  { name: "Person 1", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 2", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 3", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 4", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 5", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 6", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 7", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
  { name: "Person 8", image: "/team/placeholder.jpg", github: "https://github.com/", linkedin: "https://linkedin.com/" },
];

export default function TeamPage() {
  const [activeTeam, setActiveTeam] = useState<"core" | "web">("core");

  return (
    <section className="min-h-screen bg-black text-white px-[1.5rem] md:px-[3rem] py-[6rem]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight font-orbitron text-[#EB0028]">
          Meet Our Team
        </h1>
        <p className="mt-[1rem] text-white/60 max-w-xl">
          The people working behind the scenes to bring TEDxCUSAT to life.
        </p>

        {/* Toggle */}
        <div className="mt-[2.5rem] inline-flex rounded-full border border-white/20 p-[0.25rem]">
          <button
            onClick={() => setActiveTeam("core")}
            className={`px-[1.5rem] py-[0.5rem] text-sm rounded-full transition ${
              activeTeam === "core"
                ? "bg-[#EB0028] text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Core Team
          </button>

          <button
            onClick={() => setActiveTeam("web")}
            className={`px-[1.5rem] py-[0.5rem] text-sm rounded-full transition ${
              activeTeam === "web"
                ? "bg-[#EB0028] text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Web Team
          </button>
        </div>

        {/* Grid */}
        <div className="mt-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3rem]">
          {activeTeam === "core" &&
            coreTeam.map((member, idx) => (
              <div
                key={idx}
                className="h-[24rem] rounded-2xl border border-white/10 bg-white/[0.03] p-[1rem] flex flex-col hover:border-[#EB0028] transition"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-[1rem]">
                  <h3 className="text-base font-medium font-clash text-[#EB0028]">
                    {member.name}
                  </h3>
                  <p className="mt-[0.25rem] text-sm text-white/60">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}

          {activeTeam === "web" &&
            webTeam.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-[1rem] hover:border-[#EB0028] transition"
              >
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-[1rem]">
                  <h3 className="text-base font-medium font-clash">
                    {member.name}
                  </h3>

                  <div className="mt-[0.75rem] flex gap-[1rem]">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <Github size={18} />
                      </a>
                    )}

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}