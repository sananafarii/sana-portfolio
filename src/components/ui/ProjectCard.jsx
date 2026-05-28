const ProjectCard = ({ project }) => {
  return (
    <article className={`project-card ${project.featured ? "project-featured" : ""}`}>
      <div className="project-num">
        {project.id} · {project.category}
      </div>
      <div className="project-name">{project.name}</div>
      <p className="project-desc">{project.description}</p>
      <div className="project-stack">
        {project.stack.map((tech) => (
          <span className="stack-tag" key={tech}>
            {tech}
          </span>
        ))}
      </div>
      {project.link ? (
        <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
          View live
        </a>
      ) : null}
    </article>
  );
};

export default ProjectCard;