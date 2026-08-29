// Knowledge base for the ask-anything assistant.
// Only `summary` and `qaPatterns` are consumed — keep this file in step with
// src/data/{projects,experience,skills}.js rather than duplicating them here.
const kyleData = {
  summary: `Kyle Ryan Austria is a Full Stack Developer with 4+ years of experience building enterprise platforms in production. He specialises in Angular on the front end and Laravel on the back end, with deep AWS experience. At Clark Outsourcing he built the internal CRM and operations platform the company runs on — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system with full Philippine statutory compliance. More recently he has been integrating AI into company processes through RAG pipelines.`,

  qaPatterns: [
    {
      keywords: ['whoami', 'introduce', 'who is kyle', 'your name'],
      weak: ['who', 'name', 'yourself', 'about you', 'tell me about'],
      answer: "I'm Kyle Ryan Austria, a Full Stack Developer based in Pampanga, Philippines. I have 4+ years of experience building enterprise platforms, specialising in Angular, Laravel, and AWS. Lately I've been integrating AI into business processes with RAG pipelines, Pinecone, and Elasticsearch.",
    },
    {
      keywords: ['ls ./experience', 'work history', 'career', 'employment', 'worked', 'job', 'jobs'],
      weak: ['experience', 'work', 'where'],
      answer: "I've been a Full Stack Developer at Clark Outsourcing since May 2022, where I built and still maintain the internal CRM & operations platform — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system. More recently I've been integrating AI into company processes with RAG pipelines. I also did a part-time role at SOS Global (Australia) from Nov 2025 to Feb 2026, building NeuroScreen with Angular, NestJS, and Prisma. My career started with an OJT at Cloud Staff in 2022.",
    },
    {
      keywords: ['ls ./skills', 'skill', 'skills', 'tech stack', 'stack', 'python', 'docker', 'vite', 'typescript', 'framework', 'frameworks', 'tools', 'proficient', 'what do you use'],
      weak: ['tech', 'language', 'technology'],
      answer: "My core stack is Angular + Laravel + AWS. Frontend: Angular, React, Vite, TypeScript, NgRx, RxJS, Tailwind CSS. Backend: Laravel/PHP, NestJS, and Python with FastAPI. Data: MySQL, PostgreSQL, Redis. Cloud and tooling: AWS (EC2, S3, RDS, SQS, Route 53, Elastic Beanstalk), Docker, Nginx, Git, GitHub Actions, and CI/CD pipelines.",
    },
    {
      keywords: ['project', 'projects', 'portfolio', 'built', 'build', 'builds', 'made', 'created', 'developed', 'shipped'],
      weak: ['what have you'],
      answer: "Two live personal builds: (1) BoardHelper — a board-exam study platform with PDF highlighting, spaced-repetition flashcards, and shareable libraries, live at boardhelper.vercel.app; (2) A.R.I.A — an AI recruiter that runs real-time voice screening interviews. Client work: NeuroScreen, a developmental screening platform for Australian schools (Angular + NestJS + Prisma on AWS Sydney). And at Clark Outsourcing: the internal CRM & operations platform — employee lifecycle, helpdesk ticketing, and Airtable/Zoho automation — plus a separate payroll system that cut processing time by 80%.",
    },
    {
      keywords: ['neuroscreen', 'neuro screen', 'sos global', 'australia', 'australian', 'client work', 'screening'],
      weak: ['part-time', 'part time'],
      answer: "NeuroScreen is the platform I built for SOS Global in Australia. It lets school educators run structured developmental screenings on students — results come back as traffic-light concern levels per domain, each with practical classroom strategies attached, plus a referral pathway into clinical and allied-health services. It handles role-based access for school admins, educators, and multi-school reviewers with strict per-school data isolation, cohort tracking across classes and terms, generated PDF reports, and analytics. Angular front end, Node.js/NestJS API with Prisma, deployed on AWS in ap-southeast-2 (Sydney) so student data stays resident in Australia under the Privacy Act.",
    },
    {
      keywords: ['cat boardhelper.md', 'boardhelper', 'board helper', 'study app', 'flashcard', 'spaced repetition', 'exam'],
      answer: "BoardHelper is my board-exam study platform, live at boardhelper.vercel.app. You upload PDFs, PowerPoint decks, and images into shareable libraries, highlight directly on the page, and turn key points into spaced-repetition flashcards. It tracks how ready you are per subject against an exam countdown, and supports multi-user library sharing with viewer/editor/admin roles plus an admin approval queue for new signups. Frontend is React + Vite + TypeScript + Tailwind on Vercel; the Python backend is containerised with Docker and runs on Render.",
    },
    {
      keywords: ['education', 'school', 'university', 'degree', 'college', 'studied', 'graduate'],
      weak: ['study'],
      answer: "I earned my BS in Information Technology from the University of the Assumption (2019-2023). I was recognized as a Dean's Lister in 2022 for academic excellence.",
    },
    {
      keywords: ['contact --info', 'contact', 'get in touch', 'in touch', 'reach out', 'reach', 'email', 'hire', 'hiring', 'freelance', 'connect'],
      weak: ['available'],
      answer: "You can reach me at kyleryanaustria@gmail.com. I'm also on GitHub (github.com/KyleAustria01) and LinkedIn (linkedin.com/in/kyle-austria/). Feel free to reach out for collaborations, opportunities, or just to say hi!",
    },
    {
      keywords: ['aws', 'cloud', 'devops', 'infrastructure', 'ecs', 'ec2', 'deploy', 'deployment', 'server', 'hosting'],
      answer: "I have strong AWS experience: EC2 (compute), ECS (containers), S3 (storage), RDS (databases), SQS (message queues), Route 53 (DNS), and Elastic Beanstalk. I've architected production cloud environments in both ap-southeast-1 and ap-southeast-2 (Sydney, for Australian data residency), containerised workloads with Docker, and set up CI/CD pipelines with automated deployments and secured Git branching strategies.",
    },
    {
      keywords: ['angular', 'frontend', 'front-end', 'react', 'ngrx'],
      weak: ['ui'],
      answer: "Angular is my primary frontend framework — I've used it extensively for enterprise applications with NgRx for state management. I also work with React (this portfolio is built with React + Vite!), TypeScript, Tailwind CSS, and responsive design principles.",
    },
    {
      keywords: ['laravel', 'backend', 'back-end', 'php', 'nestjs', 'api', 'apis'],
      answer: "On the backend, I primarily use Laravel/PHP for building robust RESTful APIs, handling business logic, and database management with MySQL. I've also worked with NestJS (Node.js) for my SOS Global project. I focus on clean architecture, proper validation, and secure API design.",
    },
    {
      keywords: ['payroll', 'hris', 'crm', 'helpdesk', 'ticketing', 'airtable', 'zoho', 'automation', 'enterprise', 'clark outsourcing'],
      weak: ['hr'],
      answer: "At Clark Outsourcing the main thing I built is the internal CRM & operations platform — one system rather than a pile of apps. It covers the employee lifecycle (onboarding, time-in attendance, leave filing with approval routing, performance management, and employee record maintenance), an internal helpdesk with SQS-backed notifications and per-ticket audit trails, and an automation layer wiring Airtable and Zoho into the platform so records propagate without manual re-entry. Payroll runs as its own separate system with full Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG) — it cut processing time by 80%.",
    },
    {
      keywords: ['rag', 'pinecone', 'elasticsearch', 'elastic search', 'vector', 'embedding', 'embeddings', 'llm', 'machine learning', 'ai integration', 'artificial intelligence', 'ai'],
      answer: "I work on integrating AI into company processes — RAG pipelines in particular. That means vector search with Pinecone, Elasticsearch for retrieval, embedding and chunking strategies, and wiring LLMs into existing business workflows rather than bolting on a chatbot. A.R.I.A is the clearest public example: multi-provider LLM orchestration with a fallback chain, live web research, and document parsing feeding the model's context.",
    },
    {
      keywords: ['location', 'based', 'philippines', 'pampanga', 'country', 'timezone'],
      weak: ['from', 'live', 'where'],
      answer: "I'm based in Pampanga, Philippines. I've worked with both local companies (Clark Outsourcing, Cloud Staff) and international clients (SOS Global, Australia).",
    },
    {
      keywords: ['cat aria.md', 'aria', 'a.r.i.a', 'interview', 'interviewer', 'recruiter', 'voice'],
      weak: ['chatbot', 'personal project'],
      answer: "A.R.I.A (AI Recruiter Interview Assistant) is my AI screening platform. It parses the job description and the candidate's CV, runs a live voice interview over WebSockets with real-time transcription, and returns a scored verdict to the recruiter. Built with Python + FastAPI, React + TypeScript + Vite, Redis for resumable interview state, and Docker/Nginx for packaging. It runs a multi-provider LLM fallback chain (Cerebras → Groq → AWS Bedrock → Gemini) so a single provider outage doesn't kill an interview.",
    },
    {
      keywords: ['strength', 'strengths', 'good at', 'specialty', 'specialise', 'specialize'],
      weak: ['best'],
      answer: "My key strengths are: (1) Full-stack development with Angular + Laravel, and Node/NestJS where it fits, (2) AWS cloud architecture — EC2, ECS, RDS, S3, SQS — and the deployment pipelines around it, (3) Building enterprise platforms with genuinely complex business logic, like statutory payroll compliance, (4) Business process automation across Airtable and Zoho, and (5) Integrating AI into existing company workflows with RAG, Pinecone, and Elasticsearch.",
    },
    {
      keywords: ['hobby', 'hobbies', 'interest', 'interests', 'free time', 'outside work'],
      weak: ['fun'],
      answer: "Outside of work, I'm passionate about cloud architecture, system design, and exploring AI/ML integration in web applications. I enjoy contributing to open source and building personal projects like A.R.I.A to push my skills forward.",
    },
    {
      keywords: ['hello', 'hey', 'good morning', 'good evening'],
      weak: ['hi', 'sup', 'greet'],
      answer: "Hey there! 👋 I'm Kyle's AI assistant. I can tell you about Kyle's experience, skills, projects, education, and more. What would you like to know?",
    },
  ],
};

export default kyleData;
