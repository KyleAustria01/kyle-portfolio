import { useState, useMemo, useRef } from 'react';
import PageHead from '../components/PageHead';
import { buildCoverLetter } from '../data/coverLetter';
import {
  FONT,
  ACCENT,
  ACCENT_DARK,
  INK,
  MUTED,
  NAME,
  ROLE,
  CONTACT,
  PAGE,
  todayLong,
} from '../data/letterDesign';

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

  // docx is ~350KB, so it loads only when someone actually asks for a .docx.
  // Header mirrors build_resume_docx.js so the two documents look like a set.
  const downloadDocx = async () => {
    setBusy('docx');
    try {
      const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } = await import(
        'docx'
      );

      const header = [
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text: NAME,
              font: FONT,
              size: 44,
              bold: true,
              color: ACCENT_DARK,
              characterSpacing: 10,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: ROLE.toUpperCase(),
              font: FONT,
              size: 19,
              bold: true,
              color: ACCENT,
              characterSpacing: 30,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 240 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: ACCENT, space: 6 } },
          children: [new TextRun({ text: CONTACT, font: FONT, size: 18, color: MUTED })],
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: todayLong(), font: FONT, size: 20, color: MUTED })],
        }),
      ];

      const body = text.split('\n').map((line) => {
        const bullet = line.startsWith('- ');
        return new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: line.trim() ? 140 : 60 },
          ...(bullet ? { bullet: { level: 0 } } : {}),
          children: [
            new TextRun({
              text: bullet ? line.slice(2) : line,
              font: FONT,
              size: 21,
              color: INK,
            }),
          ],
        });
      });

      const doc = new Document({
        sections: [
          {
            properties: {
              page: { size: { width: PAGE.width, height: PAGE.height }, margin: PAGE.margin },
            },
            children: [...header, ...body],
          },
        ],
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

      {/* Print-only rendering: the letter alone, headed like the resume. */}
      <div className="print-letter" aria-hidden="true">
        <div className="pl-name">{NAME}</div>
        <div className="pl-role">{ROLE}</div>
        <div className="pl-contact">{CONTACT}</div>
        <div className="pl-date">{todayLong()}</div>
        <div className="pl-body">
          {text.split('\n').map((line, i) =>
            line.startsWith('- ') ? (
              <p className="pl-bullet" key={i}>
                {line.slice(2)}
              </p>
            ) : (
              <p key={i}>{line || ' '}</p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
