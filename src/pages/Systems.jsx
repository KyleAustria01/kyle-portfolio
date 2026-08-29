import PageHead from '../components/PageHead';
import SystemEntry from '../components/SystemEntry';
import projects from '../data/projects';

export default function Systems() {
  return (
    <div className="route-page">
      <PageHead
        title="systems"
        blurb="Platforms I've built and still maintain — two personal, one for a client, two in production at Clark Outsourcing."
      />

      <ol className="system-list">
        {projects.map((project) => (
          <SystemEntry key={project.id} project={project} />
        ))}
      </ol>
    </div>
  );
}
