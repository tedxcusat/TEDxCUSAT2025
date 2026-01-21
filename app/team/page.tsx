"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
  {
    name: "Person 3",
    role: "Staff Coordinator",
    image: "/team/placeholder.jpg",
  },
  { name: "Person 4", role: "Tech Lead", image: "/team/placeholder.jpg" },
  { name: "Person 5", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 6", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 7", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Person 8", role: "Media Lead", image: "/team/placeholder.jpg" },
  { name: "Person 9", role: "Media Lead", image: "/team/placeholder.jpg" },
  {
    name: "Person 10",
    role: "Production Lead",
    image: "/team/placeholder.jpg",
  },
  {
    name: "Person 11",
    role: "Production Lead",
    image: "/team/placeholder.jpg",
  },
  { name: "Person 12", role: "Curation Lead", image: "/team/placeholder.jpg" },
  { name: "Person 13", role: "Curation Lead", image: "/team/placeholder.jpg" },
  { name: "Person 14", role: "Content Lead", image: "/team/placeholder.jpg" },
  { name: "Person 15", role: "Outreach Lead", image: "/team/placeholder.jpg" },
  { name: "Person 16", role: "Outreach Lead", image: "/team/placeholder.jpg" },
  {
    name: "Person 17",
    role: "Sponsorship Lead",
    image: "/team/placeholder.jpg",
  },
  {
    name: "Person 18",
    role: "Sponsorship Lead",
    image: "/team/placeholder.jpg",
  },
  { name: "Person 19", role: "Treasurer", image: "/team/placeholder.jpg" },
];

const webTeam: WebMember[] = [
  {
    name: "Person 1",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 2",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 3",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 4",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 5",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 6",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 7",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Person 8",
    image: "/team/placeholder.jpg",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
];

export default function TeamPage() {
  const [activeTeam, setActiveTeam] = useState<"core" | "web">("core");
  const router = useRouter();

  // Animation Variants


  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  return (
    <main>
      <Navbar />
      <section className="min-h-screen bg-black text-white px-[1.5rem] md:px-[3rem] py-[6rem]">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}

          {/* Header */}
          <div className="flex items-center justify-between gap-[1rem] flex-wrap">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-semibold tracking-tight font-orbitron text-[#EB0028]"
            >
              Meet Our Team
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-[0.5rem] px-[1.25rem] py-[0.55rem] text-sm rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#EB0028] transition max-sm:hidden"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Home</span>
            </motion.button>

            {/* Mobile Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="inline-flex sm:hidden items-center justify-center p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#EB0028] transition"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-[1rem] text-white/60 max-w-xl"
          >
            The people working behind the scenes to bring TEDxCUSAT to life.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-[2.5rem] inline-flex rounded-full border border-white/20 p-[0.25rem]"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTeam("core")}
              className={`px-[1.5rem] py-[0.5rem] text-sm rounded-full transition ${activeTeam === "core"
                ? "bg-[#EB0028] text-white"
                : "text-white/70 hover:text-white"
                }`}
            >
              Core Team
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTeam("web")}
              className={`px-[1.5rem] py-[0.5rem] text-sm rounded-full transition ${activeTeam === "web"
                ? "bg-[#EB0028] text-white"
                : "text-white/70 hover:text-white"
                }`}
            >
              Web Team
            </motion.button>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {activeTeam === "core" ? (
              <motion.div
                key="core"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3rem]"
              >
                {coreTeam.map((member, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="h-[24rem] rounded-2xl border border-white/10 bg-white/[0.03] p-[1rem] flex flex-col hover:border-[#EB0028] transition group"
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="mt-[1rem]">
                      <h3 className="text-base font-medium font-clash text-[#EB0028]">
                        {member.name}
                      </h3>
                      <p className="mt-[0.25rem] text-sm text-white/60">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="web"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3rem]"
              >
                {webTeam.map((member, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-[1rem] hover:border-[#EB0028] transition group"
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="mt-[1rem]">
                      <h3 className="text-base font-medium font-clash">
                        {member.name}
                      </h3>

                      <div className="mt-[0.75rem] flex gap-[1rem]">
                        {member.github && (
                          <motion.a
                            whileHover={{ scale: 1.2, color: "#fff" }}
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 transition"
                          >
                            <Github size={18} />
                          </motion.a>
                        )}

                        {member.linkedin && (
                          <motion.a
                            whileHover={{ scale: 1.2, color: "#fff" }}
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 transition"
                          >
                            <Linkedin size={18} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
