import { useState } from 'react';
import Glitch from './Glitch';

export default function SystemEntry({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = `sys-${project.id}`;

  return (
    <li className="system-entry">
      <div className="system-head">
        <Glitch as="h3" className="system-name" text={project.title} />
        <span className={`status-pill status-${project.status.toLowerCase()}`}>{project.status}</span>
        <span className="system-year">{project.year}</span>
      </div>

      <p className="system-summary">{project.description}</p>

      {project.modules && (
        <dl className="module-list">
          {project.modules.map((m) => (
            <div className="module-row" key={m.name}>
              <dt>{m.name.replace(/_/g, ' ').toLowerCase()}</dt>
              <dd>{m.body}</dd>
            </div>
          ))}
        </dl>
      )}

      <dl className="field-list compact">
        <div className="field-row">
          <dt className="field-label">Stack</dt>
          <dd className="field-value">
            <ul className="tag-row">
              {project.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="field-row">
          <dt className="field-label">Deploy</dt>
          <dd className="field-value">{project.deploy}</dd>
        </div>
      </dl>

      {open && (
        <ul className="system-detail" id={panelId}>
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}

      <div className="system-actions">
        <button className="text-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={panelId}>
          {open ? 'Hide detail' : 'Detail'}
        </button>
        {project.links.map((link) => (
          <a key={link.href} className="text-btn primary" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label.replace(/[()]/g, '').replace(/_/g, ' ').toLowerCase().replace(/^./, (c) => c.toUpperCase())}
            <span aria-hidden="true"> ↗</span>
          </a>
        ))}
      </div>
    </li>
  );
}
