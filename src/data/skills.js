// Datasheet stack groups. `note` is the one-line justification shown beside the group.
const skills = [
  {
    id: 'frontend',
    label: 'Frontend',
    note: 'Angular in production for three years; React for everything I build myself.',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'NgRx', 'RxJS', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend',
    note: 'Laravel is the default; Node and Python where the problem asks for them.',
    items: ['Laravel', 'PHP', 'NestJS', 'Node.js', 'Python', 'FastAPI', 'Prisma', 'REST APIs', 'WebSockets'],
  },
  {
    id: 'ai',
    label: 'AI & Retrieval',
    note: 'Integrating AI into existing company workflows, not bolting on a chatbot.',
    items: [
      'RAG pipelines',
      'Pinecone',
      'Elasticsearch',
      'Vector embeddings',
      'LLM integration',
      'Prompt engineering',
      'AWS Bedrock',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Data',
    note: 'Architected production environments in ap-southeast-1 and ap-southeast-2.',
    items: [
      'AWS EC2',
      'AWS ECS',
      'AWS RDS',
      'AWS S3',
      'AWS SQS',
      'Route 53',
      'Elastic Beanstalk',
      'MySQL',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    id: 'ops',
    label: 'Tooling & Automation',
    note: 'Pipelines, containers, and the automation glue between business systems.',
    items: ['Docker', 'Git', 'GitHub Actions', 'CI/CD', 'Nginx', 'Airtable', 'Zoho', 'Postman', 'Jira', 'Figma'],
  },
];

export default skills;
