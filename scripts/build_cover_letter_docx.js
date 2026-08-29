// Dynamic cover letter generator — matches the resume's design system.
// Edit the CONFIG block below for each application, then: node build_cover_letter_docx.js

const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
} = require('docx');

// ======================= EDIT THIS PER APPLICATION =======================
const CONFIG = {
  company: 'Acme Corporation',
  position: 'Full Stack Developer',
  hiringManager: '', // leave blank for "Hiring Manager"
  date: 'August 29, 2026',
  // 2-3 short talking points tailored to the job post — pull the language
  // straight from the listing where you can, it reads better to a human reader.
  whyThisRole:
    'What draws me to this role is the chance to keep building products end to end — from database schema to the interface a user actually touches — on a team that ships to production regularly.',
  keyPoints: [
    'Built and still maintain the internal CRM & operations platform Clark Outsourcing runs on — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system with full Philippine statutory compliance that cut processing time by 80%.',
    'Comfortable owning a stack end to end: Angular and React on the front end, Laravel and NestJS on the back end, and AWS infrastructure (EC2, ECS, RDS, S3, SQS) in production.',
    'Currently integrating AI into company workflows through RAG pipelines with Pinecone and Elasticsearch — I like pulling new tools into existing systems rather than bolting on a chatbot for its own sake.',
  ],
  closing:
    "I'd welcome the chance to talk about how I can contribute to your team. Thank you for your time and consideration.",
};
// ===========================================================================

const FONT = 'Calibri';
const ACCENT = '0F7A4D';
const ACCENT_DARK = '0A5C3A';
const INK = '2B2B2B';
const MUTED = '6B6B6B';

const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN_L = 900;
const MARGIN_R = 900;
const MARGIN_T = 720;
const MARGIN_B = 720;

function nameHeading(text) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [new TextRun({ text, font: FONT, size: 44, bold: true, color: ACCENT_DARK, characterSpacing: 10 })],
  });
}

function roleLine(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 19, bold: true, color: ACCENT, characterSpacing: 30 })],
  });
}

function contactLine(text) {
  return new Paragraph({
    spacing: { after: 260 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: ACCENT, space: 6 } },
    children: [new TextRun({ text, font: FONT, size: 18, color: MUTED })],
  });
}

function plain(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 180, line: 268 },
    children: [new TextRun({ text, font: FONT, size: 21, color: opts.color ?? INK, bold: opts.bold })],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 90, line: 260 },
    indent: { left: 320, hanging: 260 },
    children: [
      new TextRun({ text: '•  ', font: FONT, size: 21, color: ACCENT_DARK, bold: true }),
      new TextRun({ text, font: FONT, size: 21, color: INK }),
    ],
  });
}

const greeting = CONFIG.hiringManager ? `Dear ${CONFIG.hiringManager},` : 'Dear Hiring Manager,';

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN_T, bottom: MARGIN_B, left: MARGIN_L, right: MARGIN_R },
        },
      },
      children: [
        nameHeading('KYLE RYAN AUSTRIA'),
        roleLine('Full Stack Developer'),
        contactLine(
          'Pampanga, Philippines   ·   +63 976 272 2124   ·   kyleryanaustria@gmail.com   ·   linkedin.com/in/kyle-austria   ·   github.com/KyleAustria01'
        ),

        plain(CONFIG.date, { after: 200, color: MUTED }),
        plain(greeting, { after: 200 }),

        plain(
          `I'm writing to apply for the ${CONFIG.position} role at ${CONFIG.company}. I'm a Full Stack Developer with 4+ years of experience building enterprise platforms in production — specializing in Angular on the front end and Laravel on the back end, with deep AWS experience.`
        ),

        plain(CONFIG.whyThisRole),

        plain('A few things I bring to the table:', { after: 100 }),
        ...CONFIG.keyPoints.map(bullet),

        plain(CONFIG.closing, { after: 200 }),

        plain('Sincerely,', { after: 8 }),
        plain('Kyle Ryan Austria', { after: 0, bold: true, color: ACCENT_DARK }),
      ],
    },
  ],
});

// ---- Plain-text version: for pasting into Indeed / JobStreet "cover letter"
// text boxes, which take pasted text, not a file upload. ----
function buildPlainText(cfg) {
  const lines = [
    cfg.date,
    '',
    greeting,
    '',
    `I'm writing to apply for the ${cfg.position} role at ${cfg.company}. I'm a Full Stack Developer with 4+ years of experience building enterprise platforms in production — specializing in Angular on the front end and Laravel on the back end, with deep AWS experience.`,
    '',
    cfg.whyThisRole,
    '',
    'A few things I bring to the table:',
    ...cfg.keyPoints.map((p) => `- ${p}`),
    '',
    cfg.closing,
    '',
    'Sincerely,',
    'Kyle Ryan Austria',
  ];
  return lines.join('\n');
}

const plainText = buildPlainText(CONFIG);

Packer.toBuffer(doc).then((buffer) => {
  const fs = require('fs');
  fs.writeFileSync('Kyle-Ryan-Austria-Cover-Letter.docx', buffer);
  fs.writeFileSync('Kyle-Ryan-Austria-Cover-Letter.txt', plainText, 'utf-8');
  console.log('done — .docx and .txt written');
  console.log('\n----- COPY BELOW FOR INDEED / JOBSTREET -----\n');
  console.log(plainText);
  console.log('\n----- END -----');
});
