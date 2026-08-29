const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, TabStopType, LevelFormat,
} = require('docx');

const FONT = 'Calibri';
const HEAD_FONT = 'Calibri';
const ACCENT = '0F7A4D';      // modern deep green, echoes the portfolio's terminal accent
const ACCENT_DARK = '0A5C3A';
const INK = '2B2B2B';
const MUTED = '6B6B6B';
const BLACK = '1A1A1A';

const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN_L = 850;
const MARGIN_R = 850;
const MARGIN_T = 380;
const MARGIN_B = 380;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;
const RIGHT_TAB = CONTENT_W;

function nameHeading(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 20 },
    children: [
      new TextRun({ text, font: HEAD_FONT, size: 44, bold: true, color: ACCENT_DARK, characterSpacing: 10 }),
    ],
  });
}

function roleLine(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: text.toUpperCase(), font: FONT, size: 19, bold: true, color: ACCENT, characterSpacing: 30 }),
    ],
  });
}

function contactLine(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 30 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: ACCENT, space: 6 } },
    children: [new TextRun({ text, font: FONT, size: 18, color: MUTED })],
  });
}

function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 70, after: 30 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D8D8D8', space: 4 } },
    children: [
      new TextRun({ text: text.toUpperCase(), font: HEAD_FONT, size: 20, bold: true, color: ACCENT_DARK, characterSpacing: 22 }),
    ],
  });
}

function entryLine(leftText, rightText, { boldLeft = true, italicLeft = false, colorLeft = BLACK, colorRight = ACCENT, after = 0 } = {}) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    spacing: { after },
    children: [
      new TextRun({ text: leftText, font: FONT, size: 21, bold: boldLeft, italics: italicLeft, color: colorLeft }),
      new TextRun({ text: '\t' + rightText, font: FONT, size: 18, bold: true, color: colorRight }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullet-list', level: 0 },
    spacing: { after: 10 },
    children: [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 40 },
    children: [new TextRun({ text, font: FONT, size: 21, color: opts.color ?? INK, italics: opts.italics })],
  });
}

function summaryBlock(text) {
  return new Paragraph({
    spacing: { after: 30, line: 240 },
    indent: { left: 200 },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT, space: 10 } },
    children: [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}

function additionalLine(label, value) {
  return new Paragraph({
    spacing: { after: 18 },
    children: [
      new TextRun({ text: label.toUpperCase() + '  ', font: FONT, size: 17, bold: true, color: ACCENT, characterSpacing: 10 }),
      new TextRun({ text: value, font: FONT, size: 21, color: INK }),
    ],
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 300, hanging: 260 } },
              run: { font: FONT, size: 21, color: ACCENT_DARK },
            },
          },
        ],
      },
    ],
  },
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

        sectionHeader('Summary'),
        summaryBlock(
          'Full Stack Developer with 4+ years of experience building enterprise platforms in production, ' +
          'specializing in Angular on the front end and Laravel on the back end, with deep AWS experience. ' +
          'Built the internal CRM and operations platform Clark Outsourcing runs on, plus a separate payroll ' +
          'system with full Philippine statutory compliance. Currently integrating AI into company workflows ' +
          'through RAG pipelines with Pinecone and Elasticsearch.'
        ),

        sectionHeader('Work Experience'),

        entryLine('CLARK OUTSOURCING', 'Pampanga, Philippines', { colorRight: MUTED }),
        entryLine('Full Stack Developer', 'May 2022 – Present', { boldLeft: false, italicLeft: true, colorLeft: MUTED }),
        bullet('Built and maintain the internal CRM & operations platform – employee lifecycle, helpdesk ticketing, and the Airtable/Zoho automation layer that ties them together'),
        bullet('Built a separate payroll system with full Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG), cutting processing time by 80% and manual work by 60%'),
        bullet('Architected AWS infrastructure across EC2, ECS, RDS, S3, SQS, Route 53, and Elastic Beanstalk, with CI/CD pipelines and a secured Git branching strategy'),
        bullet('Integrating AI into company processes – RAG pipelines with Pinecone and Elasticsearch for retrieval over internal knowledge'),

        entryLine('SOS GLOBAL (Australia)', 'Remote', { colorRight: MUTED }),
        entryLine('Full Stack Developer (Part-time)', 'Nov 2025 – Feb 2026', { boldLeft: false, italicLeft: true, colorLeft: MUTED }),
        bullet('Delivered NeuroScreen, a developmental screening platform for Australian schools, within an agreed 3-month project timeline'),
        bullet('Built the platform with Angular on the front end and a Node.js/NestJS API backed by Prisma; role-based access with per-school data isolation'),
        bullet('Owned the AWS deployment pipeline in ap-southeast-2 (Sydney) – EC2, security groups, load balancers – to keep student data resident in Australia'),

        entryLine('CLOUD STAFF', 'Pampanga, Philippines', { colorRight: MUTED }),
        entryLine('Associate Software Engineer (OJT)', 'Jan 2022 – Apr 2022', { boldLeft: false, italicLeft: true, colorLeft: MUTED }),
        bullet('Acquired working proficiency in Git, Angular, Laravel, and Postman'),
        bullet('Contributed to an internal web ticketing system and participated in code reviews'),

        sectionHeader('Projects'),

        entryLine('BOARDHELPER', '2026'),
        bullet('Board-exam study platform (boardhelper.vercel.app) – shareable libraries with in-browser PDF highlighting and spaced-repetition flashcards; exam countdown with weakest-subjects-first progress tracking'),
        bullet('Stack: React, Vite, TypeScript, Tailwind CSS, Python, Docker, PostgreSQL'),

        entryLine('A.R.I.A – AI RECRUITER INTERVIEW ASSISTANT', '2026'),
        bullet('AI interviewer (github.com/KyleAustria01/ARIA) running live voice screening over WebSockets with real-time transcription and a scored verdict for recruiters'),
        bullet('Multi-provider LLM fallback chain (Cerebras → Groq → AWS Bedrock → Gemini); Python, FastAPI, React, TypeScript, Redis, Docker'),

        sectionHeader('Education'),
        entryLine('UNIVERSITY OF THE ASSUMPTION', 'Pampanga, Philippines', { colorRight: MUTED }),
        entryLine('BS in Information Technology', '2019 – 2023', { boldLeft: false, italicLeft: true, colorLeft: MUTED }),
        bullet("Dean's Lister (2022)"),

        sectionHeader('Skills'),
        additionalLine('Frontend', 'Angular, React, TypeScript, JavaScript, NgRx, RxJS, Vite, Tailwind CSS, HTML5, CSS3'),
        additionalLine('Backend', 'Laravel, PHP, NestJS, Node.js, Python, FastAPI, Prisma, REST APIs, WebSockets'),
        additionalLine('AI & Retrieval', 'RAG pipelines, Pinecone, Elasticsearch, vector embeddings, LLM integration, AWS Bedrock'),
        additionalLine('Cloud & Data', 'AWS EC2, ECS, RDS, S3, SQS, Route 53, Elastic Beanstalk, MySQL, PostgreSQL, Redis'),
        additionalLine('Tooling', 'Docker, Git, GitHub Actions, CI/CD, Nginx, Airtable, Zoho, Postman, Jira'),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  require('fs').writeFileSync('Kyle-Ryan-Austria-Resume-ATS.docx', buffer);
  console.log('done');
});
