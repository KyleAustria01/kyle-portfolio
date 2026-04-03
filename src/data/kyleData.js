// Comprehensive knowledge base about Kyle for the AI assistant
const kyleData = {
  personal: {
    name: 'Kyle Ryan Austria',
    nickname: 'Kyle',
    location: 'Pampanga, Philippines',
    email: 'kyleryanaustria@gmail.com',
    github: 'https://github.com/KyleAustria01',
    linkedin: 'https://www.linkedin.com/in/kyle-austria/',
    title: 'Full Stack Developer',
    specializations: ['Angular Specialist', 'AWS Cloud Engineer', 'Enterprise Software Developer'],
    education: {
      degree: 'BS Information Technology',
      school: 'University of the Assumption',
      years: '2019 – 2023',
      achievement: "Dean's Lister (2022)",
    },
    languages: ['English', 'Filipino'],
    interests: ['Cloud Architecture', 'System Design', 'Open Source', 'AI/ML Integration', 'Building Scalable Systems'],
  },

  summary: `Kyle Ryan Austria is a Full Stack Developer with 3+ years of experience building dynamic, user-focused enterprise web applications. He specializes in Angular for frontend and Laravel for backend, with strong expertise in AWS cloud infrastructure. He has delivered enterprise-grade systems including payroll, HRIS, performance management, and incident tracking platforms at Clark Outsourcing. Kyle is passionate about creating scalable, maintainable systems that solve real business problems.`,

  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Clark Outsourcing',
      dates: 'May 2022 – Present',
      type: 'Full-time',
      description: 'Building enterprise-grade software solutions for HR and operations management.',
      highlights: [
        'Built enterprise payroll system with Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG), reducing manual work by 60% and cutting payroll processing time by 80%',
        'Developed end-to-end Employee Lifecycle Management System covering onboarding to offboarding with automated workflows',
        'Created Performance Management System with automated evaluation distribution, rating workflows, and real-time analytics',
        'Built Incident Management & Communication Platform with real-time tracking and stakeholder notifications',
        'Architected AWS infrastructure using EC2, RDS, SQS, Route 53, and Elastic Beanstalk',
        'Set up CI/CD pipelines with automated deployment notifications and secured Git branching strategies',
        'Implemented NgRx state management across multiple enterprise applications for predictable state handling',
        'Developed Leave Management & Attendance System with employee self-service portal and manager dashboards',
      ],
    },
    {
      title: 'Full Stack Developer (Part-time)',
      company: 'SOS Global, Australia',
      dates: 'Nov 2025 – Feb 2026',
      type: 'Part-time / Contract',
      description: 'Delivered a complete web application for an Australian client on a tight timeline.',
      highlights: [
        'Built full-stack web application using Angular for frontend and NestJS for backend',
        'Managed complete AWS deployment pipeline including EC2 instances, security groups, and load balancers',
        'Delivered complete end-to-end solution within the 3-month project timeline',
      ],
    },
    {
      title: 'Associate Software Engineer (OJT)',
      company: 'Cloud Staff',
      dates: 'Jan 2022 – Apr 2022',
      type: 'Internship / OJT',
      description: 'On-the-job training program where foundational software engineering skills were learned.',
      highlights: [
        'Acquired proficiency in Git, Angular, Laravel, and Postman',
        'Contributed to development of a web ticketing system',
        'Collaborated with senior developers on code reviews and best practices',
      ],
    },
  ],

  skills: {
    frontend: {
      primary: ['Angular', 'React', 'TypeScript', 'JavaScript'],
      styling: ['Tailwind CSS', 'CSS3', 'HTML5', 'Responsive Design'],
      stateManagement: ['NgRx', 'RxJS'],
    },
    backend: {
      primary: ['Laravel', 'PHP', 'NestJS', 'Node.js'],
      databases: ['MySQL', 'PostgreSQL'],
      apis: ['RESTful APIs', 'WebSockets'],
    },
    cloud: {
      aws: ['EC2', 'S3', 'RDS', 'SQS', 'Route 53', 'Elastic Beanstalk'],
      devops: ['CI/CD Pipelines', 'Docker', 'Git', 'GitHub Actions'],
    },
    tools: ['VS Code', 'Postman', 'Jira', 'Figma', 'npm'],
  },

  projects: [
    {
      title: 'Enterprise Payroll Management System',
      description: 'Full-stack payroll system with complete Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG). Automated calculations, tax computations, and report generation.',
      impact: 'Reduced payroll processing time by 80% and eliminated calculation errors.',
      stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS'],
    },
    {
      title: 'Employee Lifecycle Management System (HRIS)',
      description: 'Comprehensive HRIS platform managing the complete employee lifecycle — from recruitment and onboarding through active employment to termination/offboarding.',
      impact: 'Streamlined HR operations and provided single source of truth for employee data.',
      stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS S3'],
    },
    {
      title: 'Employee Performance Management System',
      description: 'Automated performance evaluation platform with supervisor form distribution, multi-level rating workflows, and comprehensive analytics dashboards.',
      impact: 'Automated manual evaluation process, enabling real-time performance insights.',
      stack: ['Angular', 'NgRx', 'Laravel', 'MySQL', 'AWS'],
    },
    {
      title: 'Incident Management & Communication Hub',
      description: 'Integrated incident reporting system with automated communication logs, stakeholder notifications, and real-time tracking dashboards.',
      impact: 'Improved incident response time and communication transparency across teams.',
      stack: ['Angular', 'Laravel', 'AWS SQS', 'Route 53'],
    },
    {
      title: 'Leave Management & Attendance System',
      description: 'Employee self-service portal for leave requests and attendance tracking with automated approval workflows and manager dashboards.',
      impact: 'Eliminated paper-based leave processes and provided real-time attendance visibility.',
      stack: ['Angular', 'NgRx', 'Laravel', 'AWS EC2'],
    },
    {
      title: 'A.R.I.A – AI Recruiter Interview Assistant',
      description: 'AI-powered interview platform that conducts automated screening interviews with real-time speech recognition, AI evaluation, and recruiter dashboards.',
      impact: 'Personal project showcasing AI integration skills with React, Python FastAPI, and OpenAI.',
      stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'OpenAI', 'WebSockets'],
    },
  ],

  funFacts: [
    'Wrote his first line of code in 2018',
    'Has worked with both Philippine and Australian companies',
    "Achieved Dean's List recognition at University of the Assumption",
    'Has built 5+ enterprise-grade systems used in production',
    'Passionate about cloud architecture and system design',
    'Believes in writing clean, maintainable code',
  ],

  qaPatterns: [
    {
      keywords: ['who', 'name', 'introduce', 'yourself', 'about you', 'tell me about'],
      answer: "I'm Kyle Ryan Austria, a Full Stack Developer based in Pampanga, Philippines. I have 3+ years of experience building enterprise web applications, specializing in Angular, Laravel, and AWS cloud infrastructure. I'm passionate about creating scalable systems that solve real business problems.",
    },
    {
      keywords: ['experience', 'work', 'job', 'career', 'where', 'worked'],
      answer: "I've been working as a Full Stack Developer at Clark Outsourcing since May 2022, where I've built enterprise systems like payroll, HRIS, and performance management platforms. I also did a part-time role at SOS Global (Australia) from Nov 2025 to Feb 2026, building a full-stack app with Angular and NestJS. My career started with an OJT at Cloud Staff in 2022.",
    },
    {
      keywords: ['skill', 'tech', 'stack', 'technology', 'language', 'framework', 'tools', 'what do you use', 'proficient'],
      answer: "My core stack is Angular + Laravel + AWS. On the frontend, I work with Angular, React, TypeScript, NgRx, and Tailwind CSS. For backend, I use Laravel/PHP and NestJS. Cloud-wise, I'm experienced with AWS services including EC2, S3, RDS, SQS, Route 53, and Elastic Beanstalk. I also work with CI/CD pipelines, Docker, and Git.",
    },
    {
      keywords: ['project', 'built', 'portfolio', 'what have you', 'made', 'created', 'developed'],
      answer: "I've built several enterprise-grade systems: (1) Enterprise Payroll System — reduced processing time by 80%, (2) Employee Lifecycle HRIS — full onboarding-to-offboarding management, (3) Performance Management System — automated evaluations with real-time analytics, (4) Incident Management Hub — real-time tracking with automated notifications, (5) Leave & Attendance System — self-service portal with approval workflows, and (6) A.R.I.A — an AI-powered interview assistant (personal project).",
    },
    {
      keywords: ['education', 'school', 'university', 'degree', 'study', 'studied', 'college'],
      answer: "I earned my BS in Information Technology from the University of the Assumption (2019-2023). I was recognized as a Dean's Lister in 2022 for academic excellence.",
    },
    {
      keywords: ['contact', 'reach', 'email', 'hire', 'connect', 'available', 'freelance'],
      answer: "You can reach me at kyleryanaustria@gmail.com. I'm also on GitHub (github.com/KyleAustria01) and LinkedIn (linkedin.com/in/kyle-austria/). Feel free to reach out for collaborations, opportunities, or just to say hi!",
    },
    {
      keywords: ['aws', 'cloud', 'devops', 'deploy', 'infrastructure', 'server'],
      answer: "I have strong AWS experience including EC2 (compute), S3 (storage), RDS (databases), SQS (message queues), Route 53 (DNS), and Elastic Beanstalk. I've architected production cloud environments and set up CI/CD pipelines with automated deployments and secured Git branching strategies.",
    },
    {
      keywords: ['angular', 'frontend', 'front-end', 'ui', 'react'],
      answer: "Angular is my primary frontend framework — I've used it extensively for enterprise applications with NgRx for state management. I also work with React (this portfolio is built with React + Vite!), TypeScript, Tailwind CSS, and responsive design principles.",
    },
    {
      keywords: ['laravel', 'backend', 'back-end', 'php', 'api', 'nestjs'],
      answer: "On the backend, I primarily use Laravel/PHP for building robust RESTful APIs, handling business logic, and database management with MySQL. I've also worked with NestJS (Node.js) for my SOS Global project. I focus on clean architecture, proper validation, and secure API design.",
    },
    {
      keywords: ['payroll', 'hris', 'hr', 'enterprise'],
      answer: "At Clark Outsourcing, I built an Enterprise Payroll System with full Philippine statutory compliance (SSS, PhilHealth, Pag-IBIG) that reduced processing time by 80%. I also built an Employee Lifecycle HRIS covering recruitment through termination, a Performance Management System, and more. These are production enterprise systems used by the company.",
    },
    {
      keywords: ['location', 'where', 'from', 'based', 'live', 'country'],
      answer: "I'm based in Pampanga, Philippines. I've worked with both local companies (Clark Outsourcing, Cloud Staff) and international clients (SOS Global, Australia).",
    },
    {
      keywords: ['aria', 'ai', 'interview', 'chatbot', 'personal project'],
      answer: "A.R.I.A (AI Recruiter Interview Assistant) is my personal project — an AI-powered platform that conducts automated screening interviews using real-time speech recognition, AI evaluation, and recruiter dashboards. It's built with React, TypeScript, Python FastAPI, OpenAI, and WebSockets.",
    },
    {
      keywords: ['strength', 'good at', 'best', 'specialty', 'specialize'],
      answer: "My key strengths are: (1) Full-stack development with Angular + Laravel, (2) AWS cloud architecture and infrastructure management, (3) Building enterprise-grade systems with complex business logic, (4) State management with NgRx, and (5) Delivering production-ready, scalable solutions.",
    },
    {
      keywords: ['hobby', 'interest', 'fun', 'free time', 'outside work'],
      answer: "Outside of work, I'm passionate about cloud architecture, system design, and exploring AI/ML integration in web applications. I enjoy contributing to open source and building personal projects like A.R.I.A to push my skills forward.",
    },
    {
      keywords: ['hello', 'hi', 'hey', 'sup', 'good morning', 'good evening', 'greet'],
      answer: "Hey there! 👋 I'm Kyle's AI assistant. I can tell you about Kyle's experience, skills, projects, education, and more. What would you like to know?",
    },
  ],
};

export default kyleData;
