import techstack from '../../data/techstack';

const allTools = ['VS Code', 'Postman', 'Jira', 'Figma', 'npm', 'Docker'];
const allBackend = [...techstack.backend, 'MySQL', 'PostgreSQL', 'WebSockets'];

export default function DevSkills() {
  return (
    <section id="skills" className="dev-section">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/skills</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">{"cat package.json | jq '.skills'"}</span>
      </div>

      <div className="dev-json-block">
        <div className="dev-json-brace">{'{'}</div>

        <JsonSection label="frontend" items={techstack.frontend} hasComma />
        <JsonSection label="backend" items={allBackend} hasComma />
        <JsonSection label="cloud_devops" items={techstack.cloud} hasComma />
        <JsonSection label="tools" items={allTools} hasComma={false} />

        <div className="dev-json-brace">{'}'}</div>
      </div>
    </section>
  );
}

function JsonSection({ label, items, hasComma }) {
  return (
    <div className="dev-json-section">
      <span className="dev-json-key">"{label}"</span>
      <span className="dev-text-muted">: [</span>
      <div className="dev-json-array">
        {items.map((item, i) => (
          <span key={item} className="dev-json-value">
            "{item}"{i < items.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>
      <span className="dev-text-muted">]{hasComma ? ',' : ''}</span>
    </div>
  );
}
