const projects = [
  {
    id: 'boardhelper',
    tag: 'EDTECH / PERSONAL',
    year: '2026',
    title: 'BoardHelper',
    status: 'LIVE',
    description:
      'A board-exam study platform. Upload PDFs, slide decks, and images into shareable libraries, highlight straight on the page, turn key points into spaced-repetition flashcards, and track how ready you actually are per subject against an exam countdown.',
    details: [
      'Library sharing with viewer / editor / admin roles and an admin approval queue for new signups',
      'In-browser PDF highlighting and per-slide notes for PowerPoint decks',
      'Spaced-repetition review scheduler — cards you struggle with come back sooner',
      'Exam countdown with weakest-subjects-first progress reporting',
      'Themeable UI: accent colour, density, text scale, high-contrast mode',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Python', 'Docker', 'PostgreSQL'],
    links: [{ label: 'LAUNCH_APP()', href: 'https://boardhelper.vercel.app/' }],
    deploy: 'Vercel (frontend) + Render (backend)',
  },
  {
    id: 'aria',
    tag: 'AI / RECRUITMENT',
    year: '2026',
    title: 'A.R.I.A — AI Recruiter Interview Assistant',
    status: 'ACTIVE',
    description:
      'An AI interviewer that screens applicants end to end. It reads the job description and the candidate CV, runs a live voice interview over WebSockets, transcribes in real time, and hands the recruiter a scored verdict at the end.',
    details: [
      'Real-time voice interview loop: speech-to-text, LLM reasoning, text-to-speech',
      'Multi-provider LLM fallback chain (Cerebras to Groq to AWS Bedrock to Gemini)',
      'CV and job-description parsing with PyMuPDF, plus live web research on the candidate',
      'Redis-backed interview state so a dropped session can be resumed',
      'Token-gated applicant invite links and a recruiter dashboard with verdicts',
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite', 'WebSockets', 'Redis', 'Docker', 'Nginx'],
    links: [{ label: 'VIEW_SOURCE()', href: 'https://github.com/KyleAustria01/ARIA' }],
    deploy: 'Vercel (frontend) + Render (backend) + Upstash Redis',
  },
  {
    id: 'neuroscreen',
    tag: 'HEALTHTECH / CLIENT WORK',
    year: '2026',
    title: 'NeuroScreen',
    status: 'PRODUCTION',
    description:
      'A developmental screening platform for Australian schools, built for SOS Global. Educators run structured neurodevelopmental screenings on students, get traffic-light results per domain with classroom strategies attached, and are handed a referral pathway into clinical and allied-health services.',
    details: [
      'Assessments calibrated to developmental stage, from early childhood through to secondary',
      'Results resolve to per-domain concern levels, each carrying actionable classroom strategies',
      'Cohort tracking across classes, terms, academic years, and registers to surface patterns single assessments miss',
      'Role-based access — school admin, educator, and multi-school reviewer — with strict per-school data isolation',
      'Generated PDF student and class reports, plus analytics on concern levels and assessment throughput',
      'Bulk CSV student import and full academic-calendar configuration',
      'Australian Privacy Act / APP compliance, data residency in AWS Sydney, and audit logging of every data access',
    ],
    stack: ['Angular', 'TypeScript', 'NestJS', 'Node.js', 'Prisma', 'AWS EC2', 'AWS ap-southeast-2'],
    links: [],
    deploy: 'AWS (Sydney, ap-southeast-2) — EC2, security groups, load balancers',
  },
  {
    id: 'crm',
    tag: 'ENTERPRISE / INTERNAL PLATFORM',
    year: '2022 - PRESENT',
    title: 'Internal CRM & Operations Platform',
    status: 'PRODUCTION',
    description:
      'The system the company actually runs on. One platform rather than a pile of separate apps: employee lifecycle management, an internal helpdesk, and the automation layer that keeps Airtable and Zoho in step with it. Built and extended module by module over three years.',
    modules: [
      {
        name: 'EMPLOYEE_LIFECYCLE',
        body:
          'Onboarding through to offboarding — time-in attendance, leave filing and approval routing, performance management, and continuous maintenance of employee records as people move through the org.',
      },
      {
        name: 'HELPDESK_TICKETING',
        body:
          'Internal support and incident ticketing with automated communication logs, a full audit trail per ticket, SQS-backed notification fan-out to stakeholders, and live tracking dashboards.',
      },
      {
        name: 'AUTOMATION_LAYER',
        body:
          'Airtable and Zoho automations wired into the platform so records, hand-offs, and status changes propagate without anyone re-keying them between systems.',
      },
    ],
    details: [
      'Single source of truth for employee data across every module that depends on it',
      'Configurable approval workflows per request type — leave, movement, evaluation',
      'Asynchronous notification fan-out through AWS SQS with a per-ticket communication audit trail',
      'Airtable and Zoho automations that remove manual re-entry between the platform and external tools',
      'NgRx state management standardised across the whole Angular front end',
      'Document storage on S3 with signed-URL access control',
    ],
    stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS EC2', 'AWS SQS', 'AWS S3', 'Airtable', 'Zoho'],
    links: [],
    deploy: 'AWS EC2 + RDS + S3 + SQS + Route 53',
  },
  {
    id: 'payroll',
    tag: 'ENTERPRISE / FINTECH',
    year: '2023',
    title: 'Enterprise Payroll Management System',
    status: 'PRODUCTION',
    description:
      'Payroll runs as its own system, separate from the CRM by design — the compliance surface and the audit requirements are different enough that it earns its own boundary. Full Philippine statutory compliance with automated computation and reporting.',
    details: [
      'Encoded the full Philippine statutory matrices — SSS, PhilHealth, Pag-IBIG — plus withholding tax',
      'Cut payroll processing time by 80% and eliminated manual calculation errors',
      'Automated payslip generation and distribution',
      'Government-mandated report generation and export',
    ],
    stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS'],
    links: [],
    deploy: 'AWS EC2 + RDS',
  },
];

export default projects;
