import { useState } from 'react';
import Glitch from './Glitch';

const prettyLink = (label) =>
  label
    .replace(/[()]/g, '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

/**
 * Collapsed by default: name, status, one-line summary, and the stack. The
 * modules, feature list, and deploy target only appear once expanded — the CRM
 * alone has three modules and six bullets, which buried everything else.
 */
export default function SystemEntry({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = `sys-${project.id}`;
  const moduleCount = project.modules?.length ?? 0;

  const summaryLabel = open
    ? 'Hide details'
    : moduleCount
      ? `View details · ${moduleCount} modules`
      : 'View details';

  return (
    <li className={`system-entry${open ? ' open' : ''}`}>
      <button
        className="system-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="system-head">
          {/* A span, since it sits inside the button — but still a heading in
              the accessibility tree, so the page keeps its outline. */}
          <Glitch
            as="span"
            className="system-name"
            text={project.title}
            role="heading"
            aria-level={3}
          />
          <span className={`status-pill status-${project.status.toLowerCase()}`}>
            {project.status}
          </span>
          <span className="system-year">{project.year}</span>
        </span>

        <span className="system-summary">{project.description}</span>

        <ul className="tag-row">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <span className="system-more">
          <span className="system-more-icon" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
          {summaryLabel}
        </span>
      </button>

      {open && (
        <div className="system-panel" id={panelId}>
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

          <ul className="system-detail">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <dl className="field-list compact">
            <div className="field-row">
              <dt className="field-label">Deploy</dt>
              <dd className="field-value">{project.deploy}</dd>
            </div>
          </dl>
        </div>
      )}

      {project.links.length > 0 && (
        <div className="system-actions">
          {project.links.map((link) => (
            <a
              key={link.href}
              className="text-btn primary"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {prettyLink(link.label)}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}
