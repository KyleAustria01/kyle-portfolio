import { useState, useMemo, useRef } from 'react';
import PageHead from '../components/PageHead';
import { buildCoverLetter } from '../data/coverLetter';

// Unlisted on purpose: this is a tool for applying, not a page for visitors.
export default function CoverLetter() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('Full Stack Developer');
  const [length, setLength] = useState('full');
  const [copied, setCopied] = useState(false);
  const areaRef = useRef(null);

  const text = useMemo(
    () => buildCoverLetter({ company, position, length }),
    [company, position, length],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context and permission; selecting the
      // textarea lets the user copy manually when it is refused.
      areaRef.current?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="route-page">
      <PageHead
        title="cover letter"
        blurb="Fill in the company and role, then copy the text. For job boards that only accept a pasted message instead of a file."
      />

      <div className="cl-controls">
        <label className="cl-field">
          <span>Company</span>
          <input
            type="text"
            value={company}
            placeholder="e.g. Globe Telecom"
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>

        <label className="cl-field">
          <span>Role</span>
          <input
            type="text"
            value={position}
            placeholder="e.g. Full Stack Developer"
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>

        <div className="cl-field">
          <span>Length</span>
          <div className="cl-toggle">
            <button
              className={length === 'full' ? 'active' : ''}
              onClick={() => setLength('full')}
              aria-pressed={length === 'full'}
            >
              Full
            </button>
            <button
              className={length === 'short' ? 'active' : ''}
              onClick={() => setLength('short')}
              aria-pressed={length === 'short'}
            >
              Short
            </button>
          </div>
        </div>
      </div>

      <div className="cl-output">
        <div className="cl-output-bar">
          <span className="cl-count">
            {text.length.toLocaleString()} characters · {text.split(/\s+/).length} words
          </span>
          <button className="cl-copy" onClick={copy}>
            {copied ? 'Copied ✓' : 'Copy text'}
          </button>
        </div>
        <textarea ref={areaRef} className="cl-text" value={text} readOnly spellCheck="false" />
      </div>

      <p className="cl-note">
        Files, when the form accepts them:{' '}
        <a href="/resume/Kyle-Ryan-Austria-Resume-ATS.pdf" download>
          resume (PDF)
        </a>{' '}
        ·{' '}
        <a href="/resume/Kyle-Ryan-Austria-Resume-ATS.docx" download>
          resume (DOCX)
        </a>
      </p>
    </div>
  );
}
