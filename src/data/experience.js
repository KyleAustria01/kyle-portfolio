const experience = [
  {
    id: 'clark',
    title: 'Full Stack Developer',
    company: 'Clark Outsourcing',
    dates: 'May 2022 — Present',
    impact:
      'Built and still maintain the internal CRM platform the company runs on, plus the payroll system that sits alongside it.',
    stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS', 'Airtable', 'Zoho', 'CI/CD'],
    highlights: [
      'Built the internal CRM & operations platform module by module — employee lifecycle, helpdesk ticketing, and the automation layer that ties them together',
      'Employee lifecycle module covers onboarding, time-in attendance, leave filing with approval routing, performance management, and ongoing employee record maintenance',
      'Helpdesk module handles internal support and incident ticketing with automated communication logs, SQS-backed stakeholder notifications, and live tracking dashboards',
      'Wired Airtable and Zoho automations into the platform so records and status changes propagate without manual re-entry between systems',
      'Built the payroll system as a separate service with full Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG), cutting processing time by 80% and manual work by 60%',
      'Integrating AI into company processes — RAG pipelines with Pinecone and Elasticsearch for retrieval over internal knowledge',
      'Architected AWS infrastructure across EC2, ECS, RDS, S3, SQS, Route 53, and Elastic Beanstalk',
      'Set up CI/CD pipelines with automated deployment notifications and a secured Git branching strategy',
      'Standardised NgRx state management across the Angular front end',
    ],
  },
  {
    id: 'sos',
    title: 'Full Stack Developer (Part-time)',
    company: 'SOS Global, Australia',
    dates: 'Nov 2025 — Feb 2026',
    impact:
      'Delivered NeuroScreen — a developmental screening platform now in production with Australian schools — inside a 3-month window.',
    stack: ['Angular', 'TypeScript', 'NestJS', 'Node.js', 'Prisma', 'AWS EC2'],
    highlights: [
      'Built the platform with Angular on the front end and a Node.js / NestJS API backed by Prisma',
      'Implemented role-based access for school admins, educators, and multi-school reviewers with per-school data isolation',
      'Built the screening flow end to end: background questionnaire, per-domain assessment, generated PDF reports, and analytics',
      'Owned the entire AWS deployment pipeline in ap-southeast-2 (Sydney) — EC2 instances, security groups, and load balancers — to keep data resident in Australia',
      'Delivered the end-to-end solution within the agreed project timeline',
    ],
  },
  {
    id: 'cloudstaff',
    title: 'Associate Software Engineer (OJT)',
    company: 'Cloud Staff',
    dates: 'Jan 2022 — Apr 2022',
    impact: 'On-the-job training where the foundational engineering habits were formed.',
    stack: ['Git', 'Angular', 'Laravel', 'Postman'],
    highlights: [
      'Acquired working proficiency in Git, Angular, Laravel, and Postman',
      'Contributed to the development of an internal web ticketing system',
      'Participated in code reviews and picked up team engineering practices',
    ],
  },
];

export default experience;
