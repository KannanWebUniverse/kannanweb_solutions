import Link from "next/link";

const HomePage=()=>{
    return(
        <>
        <section rel="header">
            <h1>"Hi, I'm Kannan A, a Full Stack Web Developer."</h1>
            <sub>I build scalable, user-friendly web applications using Angular, Next.js, and Golang.</sub>
        <Link href={"/projects"}>View projects</Link>
        <button type="button">Download Resume</button>
        </section>
        <section rel="about me">
        I'm a software developer specializing in frontend and backend technologies, with expertise in frameworks like Angular and Next.js.
        </section>
        </>
    )
}
export default HomePage;