import { Monitor, Server, Cloud, Wrench } from 'lucide-react';
import techstack from '../data/techstack';
import useScrollAnimation from '../hooks/useScrollAnimation';

const categories = [
  {
    name: 'Frontend Development',
    icon: Monitor,
    items: [...techstack.frontend],
  },
  {
    name: 'Backend Development',
    icon: Server,
    items: [...techstack.backend, 'MySQL', 'PostgreSQL', 'WebSockets'],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    items: techstack.cloud,
  },
  {
    name: 'Tools & Workflow',
    icon: Wrench,
    items: ['VS Code', 'Postman', 'Jira', 'Figma', 'npm', 'Docker'],
  },
];

export default function TechStack() {
  const ref = useScrollAnimation();

  return (
    <section id="skills" className="section techstack-section">
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="section-label">
            <span className="label-dot" />
            Tech Stack
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-desc">
            The tools and technologies I use daily to build production-grade applications.
          </p>
        </div>

        <div className="techstack-categories">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div className="techstack-category" key={cat.name}>
                <div className="category-header">
                  <div className="category-icon">
                    <Icon size={20} />
                  </div>
                  <span className="category-name">{cat.name}</span>
                </div>
                <div className="tech-tags">
                  {cat.items.map((item) => (
                    <span className="tech-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
