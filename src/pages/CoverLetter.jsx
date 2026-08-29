import { useState, useMemo, useRef } from 'react';
import PageHead from '../components/PageHead';
import { buildCoverLetter } from '../data/coverLetter';

const FONT = 'Garamond';

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Filename reflects the target, so a folder of applications stays legible.
function fileStem(company) {
  const slug = company.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return slug ? `Kyle-Ryan-Austria-Cover-Letter-${slug}` : 'Kyle-Ryan-Austria-Cover-Letter';
}

// Unlisted on purpose: this is a tool for applying, not a page for visitors.
export default function CoverLetter() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('Full Stack Developer');
  const [length, setLength] = useState('full');
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState('');
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

  const downloadTxt = () => {
    saveBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), `${fileStem(company)}.txt`);
  };

  // docx is ~1MB, so it loads only when someone actually asks for a .docx.
  const downloadDocx = async () => {
    setBusy('docx');
    try {
      const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import('docx');
      const body = text.split('\n').map(
        (line) =>
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: line.trim() ? 160 : 80 },
            children: [new TextRun({ text: line, font: FONT, size: 22 })],
          }),
      );
      const doc = new Document({
        sections: [{ properties: {}, children: body }],
      });
      const blob = await Packer.toBlob(doc);
      saveBlob(blob, `${fileStem(company)}.docx`);
    } finally {
      setBusy('');
    }
  };

  // Printing the letter alone — the print stylesheet hides everything else —
  // lets the browser produce the PDF, so no PDF library is bundled.
  const savePdf = () => window.print();

  return (
    <div className="route-page">
      <div className="no-print">
        <PageHead
          title="cover letter"
          blurb="Fill in the company and role, then copy the text or download it. For job boards that only accept a pasted message, and for the ones that want a file."
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
              {text.length.toLocaleString()} characters · {text.trim().split(/\s+/).length} words
            </span>
            <div className="cl-actions">
              <button className="cl-copy" onClick={copy}>
                {copied ? 'Copied ✓' : 'Copy text'}
              </button>
              <button className="cl-copy" onClick={downloadTxt}>
                .txt
              </button>
              <button className="cl-copy" onClick={downloadDocx} disabled={busy === 'docx'}>
                {busy === 'docx' ? '…' : '.docx'}
              </button>
              <button className="cl-copy" onClick={savePdf}>
                PDF
              </button>
            </div>
          </div>
          <textarea ref={areaRef} className="cl-text" value={text} readOnly spellCheck="false" />
        </div>

        <p className="cl-note">
          PDF opens your browser&apos;s print dialog — choose &ldquo;Save as PDF&rdquo; as the
          destination. Resume files:{' '}
          <a href="/resume/Kyle-Ryan-Austria-Resume-ATS.pdf" download>
            PDF
          </a>{' '}
          ·{' '}
          <a href="/resume/Kyle-Ryan-Austria-Resume-ATS.docx" download>
            DOCX
          </a>
        </p>
      </div>

      {/* Print-only rendering: the letter on its own, no interface. */}
      <div className="print-letter" aria-hidden="true">
        {text}
      </div>
    </div>
  );
}
