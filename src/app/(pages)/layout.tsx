'use client'
import Link from "next/link";
import React from "react";
import { BiDownload } from "react-icons/bi";

export default function PagesLayout({ children }: { children: React.ReactNode }) {

  const DownloadResume = () => {
    const resume = process.env.NEXT_PUBLIC_RESUME_PATH;
  
    if (!resume) {
      alert("Resume is currently unavailable. Please try again later.");
      return;
    }
  
    try {
      window.open(resume, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Failed to open resume:", error);
    }
  };
  

  return (
    <main className="grid min-h-screen">
<nav className="top-0 w-full p-6 bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md flex flex-col sm:flex-row justify-between items-center">
  <div className="text-white text-center sm:text-left mb-4 sm:mb-0">
    <h1 className="text-2xl font-bold">Hi, I&apos;m Kannan, a Full Stack Developer.</h1>
  </div>

  <div className="flex flex-wrap gap-4 justify-center sm:justify-end items-center">
    <NavButton href="/home" label="Home" />
    <NavButton href="/projects" label="View Projects" />
    <NavButton href="/resume" label="View Resume" />

    <div className="relative group">
      <button
        onClick={DownloadResume}
        className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white shadow-md transition duration-300"
      >
        <BiDownload className="text-xl" />
      </button>
      <Tooltip text="Download resume" />
    </div>
  </div>
</nav>

      {children}

      <footer className="py-12 bg-gray-100 text-center mt-10">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Get in Touch</h2>
        <p className="text-gray-700 text-lg mb-4">Feel free to reach out for collaborations or just a chat!</p>

        <div className="flex flex-col items-center gap-4">
          <a href="mailto:kannansamy9344@gmail.com" className="text-lg text-blue-500 hover:underline">
            📧 kannansamy9344@gmail.com
          </a>
          <a href="tel:+9344867199" className="text-lg text-blue-500 hover:underline">
            📞 +91 9344867199
          </a>
          <div className="flex gap-4 mt-2">
            <SocialLink href="https://github.com/KannanWebUniverse" label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/kannan-a-597386233" label="LinkedIn" />
          </div>
        </div>
      </footer>
    </main>
  );
}

const NavButton = ({ href, label }: { href: string; label: string }) => (
  <div className="relative group">
    <Link href={href}>
      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
        {label}
      </button>
    </Link>
    <Tooltip text={label} />
  </div>
);

const SocialLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" className="text-gray-600 hover:text-blue-600 text-2xl">
    🔗 {label}
  </a>
);

const Tooltip = ({ text }: { text: string }) => (
  <div className="absolute left-1/2 top-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-1 transition-opacity">
    {text}
  </div>
);
