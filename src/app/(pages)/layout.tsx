'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { fetchCSV } from "../api";
import useStore from "../zustand/store";
type Sheets = {
  Skills: string;
  SoftSkills: string;
  Education: string;
  Experience: string;
  Projects: string;
  Achievements: string;
  PersonalInfo: string;
}
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const { setTechnicalSkills, setSoftSkills, setEducation, setExperiences,
     setAchievements, setProjects, setPersonalInfo,PersonalInfo } = useStore()
  const [sheets, setSheets] = useState<Sheets>()
  useEffect(() => {
    loadSheets()
  }, [])
  useEffect(() => {
    if (!sheets) return
    loadData()
  }, [sheets])

  const loadSheets = async () => {

    const sheets: any[] = await fetchCSV('0');
    console.log(sheets);
    if (sheets && sheets.length > 0) {
      setSheets(sheets[0])
    }
  }
  const loadData = async () => {
    if (!sheets) return
    try {
         fetchCSV(sheets.PersonalInfo).then(res=>{
      if (res && res.length > 0) {
        setPersonalInfo(res[0])
      }
            })

      fetchCSV(sheets.Skills).then((res:any)=>{
      console.log(res);

      // Group by Type
      const grouped: { [key: string]: string[] } = {};

      res.forEach(item => {
        const type = item.Type;
        const skill = item.Skill;

        if (!grouped[type]) {
          grouped[type] = [];
        }
        grouped[type].push(skill);
      });

      // Convert grouped object to array of TechnicalSkills
      const technicalSkills: any[] = Object.keys(grouped).map(type => ({
        Type: type,
        List: grouped[type]
      }));

      console.log(technicalSkills);

      // Set to Zustand store
      setTechnicalSkills(technicalSkills);

      });

      fetchCSV(sheets.SoftSkills).then(res=>{
      console.log(res)
      setSoftSkills(res)
      })

      fetchCSV(sheets.Education).then((res:any)=>{
      console.log(res)
      setEducation(res)
      })

  fetchCSV(sheets.Experience).then((res:any)=>{
      console.log(res);

      const formattedExperiences = res.map(item => ({
        ...item,
        Responsibilities: item.Responsibilities ? item.Responsibilities.split(';').map(r => r.trim()) : []
      }));
      console.log(formattedExperiences);
      setExperiences(formattedExperiences);
  })


      fetchCSV(sheets.Projects).then((res:any)=>{
 console.log(res);

      const formattedProjects = res.map(item => ({
        ...item,
        TechnologiesUsed: item.TechnologiesUsed ? item.TechnologiesUsed.split(';').map(t => t.trim()) : [],
        Responsibilities: item.Responsibilities ? item.Responsibilities.split(';').map(r => r.trim()) : []
      }));

      console.log(formattedProjects);
      setProjects(formattedProjects);
      })
     

      fetchCSV(sheets.Achievements).then((res:any)=>{
    console.log(res)
      setAchievements(res)
      })
  




    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const DownloadResume = () => {
    const resume = PersonalInfo?.Resume;

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
      <nav className="top-0 w-full p-6 bg-blue-100 shadow-md flex flex-col sm:flex-row justify-between items-center">
        <div className="text-white text-center sm:text-left mb-4 sm:mb-0">
          {PersonalInfo?.Name&&(<h1 className="text-2xl font-bold">Hi, I&apos;m {PersonalInfo?.Name}, a {PersonalInfo?.Designation}.</h1>)}
          
        </div>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-end items-center">
          <NavButton href="/home" label="Home" />
          <NavButton href="/projects" label="View Projects" />
          {/* <NavButton href="/resume" label="View Resume" /> */}

          <div className="relative group">
            <button
              onClick={DownloadResume}
              className="p-2 bg-lime-950 hover:bg-cyan-700 rounded-full text-white shadow-md transition duration-300"
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
          {
            PersonalInfo?.Email&&(
          <a href={`mailto:${PersonalInfo?.Email}`} className="text-lg text-blue-500 hover:underline">
            📧 {PersonalInfo?.Email}
          </a>
            )
          }
          {
            PersonalInfo?.Mobile&&
  (<a href={`tel:+${PersonalInfo?.Mobile}`} className="text-lg text-blue-500 hover:underline">
            📞 +91 {PersonalInfo?.Mobile}
          </a>)
          }

        
          <div className="flex gap-4 mt-2">
           {PersonalInfo?.Github&& (<SocialLink href={PersonalInfo?.Github!} label="GitHub" />)}
            {PersonalInfo?.LinkedIn&&(<SocialLink href={PersonalInfo?.LinkedIn!} label="LinkedIn" />)}
          </div>
        </div>
      </footer>
    </main>
  );
}

const NavButton = ({ href, label }: { href: string; label: string }) => (
  <div className="relative group">
    <Link href={href}>
      <button className="px-4 py-2 bg-lime-950 hover:bg-cyan-700 text-white rounded-lg shadow-md transition duration-300">
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
