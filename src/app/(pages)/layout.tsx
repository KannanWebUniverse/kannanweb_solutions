'use client'
import Link from "next/link";
import React from "react";
import { BiDownload } from "react-icons/bi";

export default function PagesLayout({children}:{children:React.ReactNode}) {

  
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
  <nav className="top-0 w-full p-6 bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md flex flex-col sm:flex-row justify-between items-center">
    <div className="flex flex-col text-white text-center sm:text-left mb-4 sm:mb-0">
      <h1 className="text-2xl font-bold">Hi, I&apos;m Kannan A, a Full Stack Web Developer.</h1>
      <p className="text-sm italic mt-1">
        I build scalable, user-friendly web applications using Angular, Next.js, and Golang.
      </p>
    </div>

    <div className="flex flex-wrap justify-center sm:justify-end space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 items-center">
      <div className="relative group">
        <Link href="/home">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
            Home
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-1 transition-opacity">
            Home
          </div>
        </Link>
      </div>
      <div className="relative group">
        <Link href="/projects">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
            View Projects
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-1 transition-opacity">
            View projects
          </div>
        </Link>
      </div>
      <div className="relative group">
        <Link href="/resume">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
            View Resume
          </button>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-1 transition-opacity">
          View resume
        </div>
      </div>
      <div className="relative group">
        <button
          onClick={DownloadResume}
          className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white shadow-md transition duration-300"
        >
          <BiDownload className="text-xl" />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-6 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded-md px-3 py-1 transition-opacity">
          Download resume
        </div>
      </div>
    </div>
  </nav>
  {children}
</main>

  );
}
