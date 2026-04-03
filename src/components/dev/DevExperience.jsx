import experience from '../../data/experience';

export default function DevExperience() {
  return (
    <section id="experience" className="dev-section">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/career</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">git log --all --oneline --graph</span>
      </div>

      <div className="dev-git-log">
        {experience.map((job, idx) => (
          <div className="dev-commit" key={job.title + job.company}>
            <div className="dev-commit-header">
              <span className="dev-commit-hash">
                {`${String(experience.length - idx).padStart(2, '0')}${Math.random().toString(16).slice(2, 8)}`}
              </span>
              <span className="dev-commit-date">{job.dates}</span>
            </div>
            <div className="dev-commit-message">
              <span className="dev-green">{job.title}</span>
              <span className="dev-text-muted"> @ </span>
              <span className="dev-blue">{job.company}</span>
            </div>
            <div className="dev-commit-details">
              {job.highlights.map((h, i) => (
                <div className="dev-commit-line" key={i}>
                  <span className="dev-tree-char">│</span>
                  <span className="dev-commit-diff">+ {h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
