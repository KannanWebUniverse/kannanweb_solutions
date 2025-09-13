import { create } from 'zustand'

interface TechnicalSkills {
    Type: string;
    List: string[];
}

interface Education {
    Degree: string;
    StartDate: string;
    EndDate: string;
    College: string;
    University: string;
    Website: string;
    LinkedIn: string;
    GGPA: string;
}

interface Experience {
    Company: string;
    From: string;
    To: string;
    Role: string;
    Responsibilities: string[];
}

interface Projects {
    Name: string;
    Description: string;
    TechnologiesUsed: string[];
    Extra: string;
    Responsibilities: string[];
}
type PersonalInfo={
    Name?:string;
    Age?:number
    BloodGroup?:string;
    Email?:string;
    Mobile?:string;
    LinkedIn?:string;
    Github?:string;
    Resume?:string;
    Designation?:string;
    AboutMe?:string;
}

type StoreData = {
    TechnicalSkills: TechnicalSkills[] | undefined;
    setTechnicalSkills: (value: TechnicalSkills[]) => void;

    Education: Education[] | undefined;
    setEducation: (value: Education[]) => void;

    SoftSkills: {Skill:string}[] | undefined;
    setSoftSkills: (value: any[]) => void;

    Projects: Projects[] | undefined;
    setProjects: (value: Projects[]) => void;

    Experiences: Experience[] | undefined;
    setExperiences: (value: Experience[]) => void;

    Achievements: {Achievement:string}[] | undefined;
    setAchievements: (value: {Achievement:string}[]) => void;

 PersonalInfo: PersonalInfo | undefined;
    setPersonalInfo: (value: PersonalInfo) => void;
}


const useStore = create<StoreData>((set) => ({
    TechnicalSkills: undefined,
    setTechnicalSkills: (skills) => set(() => ({ TechnicalSkills: skills })),

    Education: undefined,
    setEducation: (education) => set(() => ({ Education: education })),

    SoftSkills: undefined,
    setSoftSkills: (skills) => set(() => ({ SoftSkills: skills })),

    Projects: undefined,
    setProjects: (project) => set(() => ({ Projects: project })),

    Experiences: undefined,
    setExperiences: (experience) => set(() => ({ Experiences: experience })),

    Achievements: undefined,
    setAchievements: (achievements) => set(() => ({ Achievements: achievements })),

    PersonalInfo:undefined,
    setPersonalInfo:(value)=>set(()=>({PersonalInfo:value})) ,
}));

export default useStore;
