import projects from '../../data/projects';
import { Folder, Zap } from 'lucide-react';

export default function DevProjects() {
  return (
    <section id="projects" className="dev-section">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/projects</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">{"ls -la && cat */README.md"}</span>
      </div>

      <div className="dev-projects-grid">
        {projects.map((project) => (
          <div className="dev-project-card" key={project.title}>
            <div className="dev-project-header">
              <Folder size={16} className="dev-green" />
              <span className="dev-project-name">{project.title}</span>
            </div>
            <div className="dev-project-readme">
              <span className="dev-comment">// {project.description}</span>
            </div>
            {project.impact && (
              <div className="dev-project-impact">
                <Zap size={12} />
                <span>{project.impact}</span>
              </div>
            )}
            <div className="dev-project-stack">
              {project.stack.map((tech) => (
                <span className="dev-stack-tag" key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
