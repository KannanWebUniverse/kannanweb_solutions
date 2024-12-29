"use client"
import { IFProjects } from "@/app/interfaces/if_projects"
import { useEffect, useState } from "react"

const ProjectsPage=()=>{
const [projects,setProjects]=useState<IFProjects>()
const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>, controller: AbortController) => {
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    setter(data);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Fetch aborted:', url);
    } else {
      console.error('Fetch error:', error);
    }
  }
};

const useFetchData = (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, setter, controller);
    return () => controller.abort();
  }, [url, setter]);
};
useFetchData(`/api/projects`, setProjects);
  return (
    <>
      <section className="mt-10 px-4 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
          Projects Worked
        </h1>
        <ul className="grid gap-8 lg:grid-cols-2">
          {projects?.data.map((project) => (
            <li key={project.name} className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl transition-shadow">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies_used.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-100 text-indigo-600 text-xs font-medium py-1 px-3 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{project.extra}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
  
}
export default ProjectsPage