// Kept in step with scripts/build_cover_letter_docx.js so the pasted text and
// the generated PDF say the same thing.
const OPENING = (position, company) =>
  `I'm writing to apply for the ${position} role at ${company}. I'm a Full Stack Developer with 4+ years of experience building enterprise platforms in production — specializing in Angular on the front end and Laravel on the back end, with deep AWS experience.`;

const WHY =
  'What draws me to this role is the chance to keep building products end to end — from database schema to the interface a user actually touches — on a team that ships to production regularly.';

const POINTS = [
  'Built and still maintain the internal CRM & operations platform Clark Outsourcing runs on — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system with full Philippine statutory compliance that cut processing time by 80%.',
  'Comfortable owning a stack end to end: Angular and React on the front end, Laravel and NestJS on the back end, and AWS infrastructure (EC2, ECS, RDS, S3, SQS) in production.',
  'Currently integrating AI into company workflows through RAG pipelines with Pinecone and Elasticsearch — I like pulling new tools into existing systems rather than bolting on a chatbot for its own sake.',
];

const CLOSING =
  "I'd welcome the chance to talk about how I can contribute to your team. Thank you for your time and consideration.";

const SIGNOFF = 'Sincerely,\nKyle Ryan Austria';

/**
 * `full` reads as a letter. `short` is for boards that cap the field —
 * JobStreet's message box is the usual offender.
 */
export function buildCoverLetter({ company, position, length = 'full', greeting = 'Dear Hiring Manager,' }) {
  const co = company.trim() || 'your company';
  const role = position.trim() || 'Full Stack Developer';

  if (length === 'short') {
    return [
      greeting,
      '',
      OPENING(role, co),
      '',
      `At Clark Outsourcing I built and still maintain the internal CRM and operations platform the company runs on — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system with full Philippine statutory compliance that cut processing time by 80%. I'm comfortable owning a stack end to end, and I'm currently integrating AI into company workflows through RAG pipelines.`,
      '',
      CLOSING,
      '',
      SIGNOFF,
    ].join('\n');
  }

  return [
    greeting,
    '',
    OPENING(role, co),
    '',
    WHY,
    '',
    'A few things I bring to the table:',
    ...POINTS.map((p) => `- ${p}`),
    '',
    CLOSING,
    '',
    SIGNOFF,
  ].join('\n');
}
