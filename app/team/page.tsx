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

type TechMember = {
  name: string;
  image: string;
  github?: string;
  linkedin?: string;
};

const coreTeam: CoreMember[] = [
  { name: "Deva Nandan S", role: "Organizer", image: "/team/Devan.jpeg" },
  { name: "Adithyan Pramod", role: "Organizer", image: "/team/Pramod.jpeg" },
  {
    name: "Sheena K M",
    role: "Staff Coordinator",
    image: "/team/Sheena.jpeg",
  },
  { name: "Abdul Rayif", role: "Tech Lead", image: "/team/Rayif.jpeg" },
  { name: "Athira", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Asiya Fyroos", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Shanif K V", role: "Ambience Lead", image: "/team/placeholder.jpg" },
  { name: "Theja Lakshmi", role: "Media Lead", image: "/team/Theja.jpeg" },
  { name: "Gopikrishnan S", role: "Media Lead", image: "/team/placeholder.jpg" },
  {
    name: "Jenoo Liju",
    role: "Production Lead",
    image: "/team/Jenoo.jpeg",
  },
  {
    name: "Akshay S",
    role: "Production Lead",
    image: "/team/Akshay.jpeg",
  },
  { name: "Shazia Nanakkal", role: "Curation Lead", image: "/team/Shazia.jpeg" },
  { name: "Anagha", role: "Curation Lead", image: "/team/Anagha.jpeg" },
  { name: "Arjun ", role: "Content Lead", image: "/team/Arjun.jpg" },
  { name: "Daliya Noushad", role: "Outreach Lead", image: "/team/Daliya.jpeg" },
  { name: "Riya Fathima", role: "Outreach Lead", image: "/team/placeholder.jpg" },
  {
    name: "Durga Sumesh",
    role: "Sponsorship Lead",
    image: "/team/placeholder.jpg",
  },
  {
    name: "Sanjeev Shankar",
    role: "Sponsorship Lead",
    image: "/team/placeholder.jpg",
  },
  { name: "Kevin Jose Edacheril", role: "Treasurer", image: "/team/placeholder.jpg" },
];

const techTeam: TechMember[] = [
  {
    name: "Abdul Rayif",
    image: "/team/rayray.jpeg",
    github: "https://github.com/Abdulrayifvp",
    linkedin: "https://www.linkedin.com/in/rayifvp",
  },
  {
    name: "Arun Mathew Ajay",
    image: "/team/ArunM.jpeg",
    github: "https://github.com/BluJay04",
    linkedin: "https://www.linkedin.com/in/arunmathewajay",
  },
  {
    name: "Shreya Nithin", 
    image: "/team/Shreya.jpeg",
    github: "https://github.com/shreyanithin",
    linkedin: "https://www.linkedin.com/in/shreya-nithin-874872277",
  },
  {
    name: "Akarsh Balachandran",
    image: "/team/Akarsh.jpeg",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/akarshbalachandran",
  },
  {
    name: "Sebin Thomas",
    image: "/team/Sebin.jpeg",
    github: "https://github.com/Abyssalwolf",
    linkedin: "https://www.linkedin.com/in/sebinthomas78",
  },
  {
    name: "Shiva Sajay",
    image: "/team/Shiva.jpeg",
    github: "https://github.com/shivaacodes",
    linkedin: "https://www.linkedin.com/in/shiva-sajay-03a473288",
  },
  {
    name: "Josh Joseph",
    image: "/team/Josh.jpeg",
    github: "https://github.com/JoshJoseph1234",
    linkedin: "https://www.linkedin.com/in/josh-joseph-b90a2829a",
  },
  {
    name: "Adithya Menon",
    image: "/team/Adithya.jpeg",
    github: "https://github.com/apm2004",
    linkedin: "https://www.linkedin.com/in/adithya-p-menon",
  },
];

export default function TeamPage() {
  const [activeTeam, setActiveTeam] = useState<"core" | "tech">("core");
  const router = useRouter();

  // Animation Variants


  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } },
  };

  return (
    <main>
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
              onClick={() => setActiveTeam("tech")}
              className={`px-[1.5rem] py-[0.5rem] text-sm rounded-full transition ${activeTeam === "tech"
                ? "bg-[#EB0028] text-white"
                : "text-white/70 hover:text-white"
                }`}
            >
              Tech Team
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
                        unoptimized
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
                key="tech"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-[3.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3rem]"
              >
                {techTeam.map((member, idx) => (
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
                        unoptimized
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
