'use client'
import Link from "next/link";
import { BiDownload } from "react-icons/bi";

export default function PagesLayout({children}:any) {

  
  const DownloadResume = () => {
    const resume = process.env.NEXT_PUBLIC_RESUME_PATH;
    if (resume) {
      window.open(resume, '_self');
    } else {
      console.error('Resume path is not defined');
    }
  };

  return (
    <main className="grid">
      <nav className="top-0 w-full p-6 bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md flex justify-between items-center">
  <div className="flex flex-col text-white">
    <h1 className="text-2xl font-bold">Hi, I'm Kannan A, a Full Stack Web Developer.</h1>
    <p className="text-sm italic mt-1">
      I build scalable, user-friendly web applications using Angular, Next.js, and Golang.
    </p>
  </div>

  <div className="flex space-x-4 items-center">
    <Link href="/projects">
      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
        View Projects
      </button>
    </Link>
    <Link href="/resume">
      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
        View Resume
      </button>
    </Link>
    <button
      onClick={DownloadResume}
      className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white shadow-md transition duration-300"
    >
      <BiDownload className="text-xl" />
    </button>
  </div>
</nav>
   {children}
    </main>
  );
}
