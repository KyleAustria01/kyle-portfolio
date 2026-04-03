import { Briefcase, GraduationCap, Cloud, Code } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function About() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="section-label">
            <span className="label-dot" />
            About Me
          </div>
          <h2 className="section-title">Passionate About Building Great Software</h2>
          <p className="section-desc">
            I turn complex business requirements into clean, maintainable code that scales.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a Full Stack Developer with <strong>3+ years</strong> of hands-on experience building dynamic, user-focused 
              enterprise web applications. My journey started at <strong>Cloud Staff</strong> as an OJT in 2022, where I learned 
              the foundations of Angular, Laravel, and Git.
            </p>
            <p>
              At <strong>Clark Outsourcing</strong>, I've grown into a developer who delivers production-grade systems — 
              from payroll processing that reduced manual work by 60% to full employee lifecycle management platforms. 
              I've architected AWS cloud environments, set up CI/CD pipelines, and implemented enterprise-level state 
              management with NgRx.
            </p>
            <p>
              I also took on a <strong>part-time role at SOS Global (Australia)</strong>, where I built a complete 
              Angular + NestJS application and managed its AWS deployment from scratch — delivering the entire 
              project within a 3-month timeline.
            </p>
            <p>
              Outside of work, I'm passionate about <strong>AI/ML integration</strong> in web applications — my personal 
              project <strong>A.R.I.A</strong> (AI Recruiter Interview Assistant) showcases that passion.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-card">
              <div className="highlight-icon">
                <Briefcase size={22} />
              </div>
              <div className="highlight-content">
                <h4>3+ Years Professional Experience</h4>
                <p>Building enterprise systems at Clark Outsourcing, with international project experience at SOS Global (Australia).</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <Code size={22} />
              </div>
              <div className="highlight-content">
                <h4>Full Stack Specialist</h4>
                <p>Angular + Laravel as core stack, with React, NestJS, TypeScript, and NgRx in the toolbelt.</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <Cloud size={22} />
              </div>
              <div className="highlight-content">
                <h4>AWS Cloud Architecture</h4>
                <p>EC2, S3, RDS, SQS, Route 53, Elastic Beanstalk — production environments I've built and managed.</p>
              </div>
            </div>

            <div className="highlight-card">
              <div className="highlight-icon">
                <GraduationCap size={22} />
              </div>
              <div className="highlight-content">
                <h4>BS Information Technology</h4>
                <p>University of the Assumption (2019–2023). Dean's Lister 2022.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
