'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";

const HomePage=()=>{
  const [TechnicalSkills, setTechnicalSkills] = useState({ data: [] });
  const [SoftSkills, setSoftSkills] = useState({ data: [] });
  const [Experience, setExperience] = useState({ data: [] });
  const [Education, setEducation] = useState({ data: [] });

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>, controller: AbortController) => {
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
      }
      const data = await response.json();
      setter(data);
    } catch (error:any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted:', url);
      } else {
        console.error('Fetch error:', error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchTechnicalSkills = async () => {
      await fetchData(`${process.env.SERVER}/api/technical_skills`, setTechnicalSkills, controller);
    };
    fetchTechnicalSkills();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSoftSkills = async () => {
      await fetchData(`${process.env.SERVER}/api/soft_skills`, setSoftSkills, controller);
    };
    fetchSoftSkills();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchExperience = async () => {
      await fetchData(`${process.env.SERVER}/api/experience`, setExperience, controller);
    };
    fetchExperience();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchEducation = async () => {
      await fetchData(`${process.env.SERVER}/api/education`, setEducation, controller);
    };
    fetchEducation();

    return () => controller.abort();
  }, []);

    return(
        <>
<main className="bg-gray-100 text-gray-800 min-h-screen p-6">
      <section className="text-center py-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg">
          I&apos;m a software developer specializing in frontend and backend technologies, with expertise in frameworks like Angular and Next.js.
        </p>
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Technical Skills</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TechnicalSkills.data.map((skill: any) => (
            <li key={skill.type} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">{skill.type}</h2>
              <div className="text-gray-700 p-2 flex-row justify-between">
                {skill.list.map((item: any) => (
                  <sub key={item} className="block mb-1 p-4">
                    {item}
                  </sub>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Experience</h1>
        {Experience.data.map((exp: any) => (
          <div key={exp.company} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-indigo-600">{exp.company}</h2>
            <h3 className="text-gray-700">Role: {exp.role}</h3>
            <p className="text-gray-500">
              From: {exp.from} | To: {exp.to}
            </p>
            <h4 className="text-lg font-semibold mt-4">Responsibilities:</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {exp.responsibilities.map((res: any) => (
                <li key={res}>{res}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Education</h1>
        {Education.data.map((edu: any) => (
          <div key={edu.degree} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-indigo-600">{edu.degree}</h2>
            <h3 className="text-gray-700">College: {edu.college}</h3>
            <h3 className="text-gray-700">University: {edu.university}</h3>
            <div className="mt-2">
              <span className="font-semibold">Website:</span>{' '}
              <Link href={edu.website} target="_blank" className="text-indigo-500 underline">
              {edu.college}
              </Link>
            </div>
            <div>
              <span className="font-semibold">LinkedIn:</span>{' '}
              <Link href={edu.linkedin} target="_blank" className="text-indigo-500 underline">
              {edu.college}
              </Link>
            </div>
            <p className="text-gray-500">
              From: {edu.start_date} | To: {edu.end_date}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6">Soft Skills</h1>
        <ul className="flex flex-wrap justify-center gap-4">
          {SoftSkills.data.map((skill: any) => (
            <li
              key={skill}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </main>
        </>
    )
}
export default HomePage;