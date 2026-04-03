import { Folder, Zap } from 'lucide-react';
import projects from '../data/projects';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Projects() {
  const ref = useScrollAnimation();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="section-label">
            <span className="label-dot" />
            Portfolio
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Enterprise-grade systems and personal projects I've built and shipped.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-icon">
                <Folder size={22} />
              </div>
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.description}</div>
              {project.impact && (
                <div className="project-impact">
                  <Zap size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  {project.impact}
                </div>
              )}
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span className="project-stack-tag" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
