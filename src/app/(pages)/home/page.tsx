"use client";
import { IFEducations } from "@/app/interfaces/if_education";
import { IFExperience } from "@/app/interfaces/if_experience";
import { IFSoftSkills } from "@/app/interfaces/if_softskills";
import { IFTecnicalSkills } from "@/app/interfaces/if_technicalskills";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";

const HomePage = () => {
  const [TechnicalSkills, setTechnicalSkills] = useState<IFTecnicalSkills | null>(null);
  const [SoftSkills, setSoftSkills] = useState<IFSoftSkills | null>(null);
  const [Experience, setExperience] = useState<IFExperience | null>(null);
  const [Education, setEducation] = useState<IFEducations | null>(null);
  const [Achievements, setAchievements] = useState<{ data: string[] } | null>(null);

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(`/api/technical_skills`, setTechnicalSkills);
    fetchData(`/api/soft_skills`, setSoftSkills);
    fetchData(`/api/experience`, setExperience);
    fetchData(`/api/education`, setEducation);
    fetchData(`/api/achievements`, setAchievements);
  }, []);

  return (
    <main className="bg-gray-100 text-gray-800 min-h-screen p-6">
<section className="text-center py-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
  <h1 className="text-4xl font-bold mb-4">About Me</h1>
  <p className="text-lg max-w-3xl mx-auto">
    Detail-oriented Software Engineer with nearly 3 years of experience in full-stack development, cloud infrastructure, and API integration. Skilled in designing, developing, and deploying scalable applications using AWS, Angular, Next.js, .NET Core, and Golang. Expertise in payment gateway integration, database management, and Agile methodologies. Passionate about building efficient, high-performance solutions and collaborating in dynamic team environments.
  </p>
</section>


      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Technical Skills</h1>
        {!TechnicalSkills ? (
          <p className="text-center text-gray-500">Loading technical skills...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TechnicalSkills.data.map((skill) => (
              <li key={skill.type} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-indigo-600 mb-2">{skill.type}</h2>
                <ul className="text-gray-700">
                  {skill.list.map((item) => (
                    <li key={item} className="mb-1">{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Experience</h1>
        {!Experience ? (
          <p className="text-center text-gray-500">Loading experience details...</p>
        ) : (
          Experience.data.map((exp) => (
            <div key={exp.company} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-indigo-600">{exp.company}</h2>
              <h3 className="text-gray-700">Role: {exp.role}</h3>
              <p className="text-gray-500">From: {exp.from} | To: {exp.to}</p>
              <h4 className="text-lg font-semibold mt-4">Responsibilities:</h4>
              <ul className="list-disc ml-5 text-gray-700">
                {exp.responsibilities.map((res) => (
                  <li key={res}>{res}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Education</h1>
        {!Education ? (
          <p className="text-center text-gray-500">Loading education details...</p>
        ) : (
          Education.data.map((edu) => (
            <div key={edu.degree} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-indigo-600">{edu.degree}</h2>
              <h3 className="text-gray-700">College: {edu.college}</h3>
              <h3 className="text-gray-700">University: {edu.university}</h3>
              <div className="mt-2">
                <span className="font-semibold">Website:</span>{" "}
                <Link href={edu.website} target="_blank" className="text-indigo-500 underline">
                  {edu.college}
                </Link>
              </div>
              <p className="text-gray-500">From: {edu.start_date} | To: {edu.end_date}</p>
            </div>
          ))
        )}
      </section>
      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Achievements</h1>
        {!Achievements ? (
          <p className="text-center text-gray-500">Loading achievements...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Achievements.data.map((ach) => (
              <li key={ach} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <FaMedal className="text-yellow-500 text-2xl mr-4" />
                <h3 className="text-gray-700">{ach}</h3>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Soft Skills</h1>
        {!SoftSkills ? (
          <p className="text-center text-gray-500">Loading soft skills...</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-4">
            {SoftSkills.data.map((skill) => (
              <li key={skill} className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                {skill}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default HomePage;
