import { projects } from "../../constants/projects";
import { FadeIn, SectionEyebrow } from "../common";
import { ProjectCard } from "../ui";

const Projects = () => {
  return (
    <section id="projects" className="section-wrap">
      <FadeIn>
        <SectionEyebrow>Key Projects</SectionEyebrow>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">
          Things I've <em>shipped</em>
        </h2>
      </FadeIn>
      <FadeIn>
        <p className="section-sub">
          Production applications used by real people — across streaming, fintech, social, and corporate domains.
        </p>
      </FadeIn>
      <FadeIn>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default Projects;