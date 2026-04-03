export default function DevAbout() {
  return (
    <section id="about" className="dev-section">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/about</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">cat about.ts</span>
      </div>

      <div className="dev-code-block">
        <div className="dev-comment-block">
          <span className="dev-comment">{'/**'}</span>
          <br />
          <span className="dev-comment">{' * @file    about.ts'}</span>
          <br />
          <span className="dev-comment">{' * @author  Kyle Ryan Austria'}</span>
          <br />
          <span className="dev-comment">{' * @since   2022'}</span>
          <br />
          <span className="dev-comment">{' */'}</span>
        </div>

        <div className="dev-code-line">
          <span className="dev-keyword">interface </span>
          <span className="dev-type">Developer</span>
          <span className="dev-text-muted">{' {'}</span>
        </div>

        <div className="dev-object-content">
          <div className="dev-property">
            <span className="dev-prop-name">background</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-string">"Full Stack Developer with 3+ years of hands-on experience building dynamic, user-focused enterprise web applications. Journey started at Cloud Staff as an OJT in 2022."</span>
          </div>

          <div className="dev-property">
            <span className="dev-prop-name">current</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-string">"At Clark Outsourcing — delivering production-grade systems: payroll processing (60% less manual work), full employee lifecycle management, and enterprise-level state management with NgRx."</span>
          </div>

          <div className="dev-property">
            <span className="dev-prop-name">international</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-string">"Part-time at SOS Global (Australia) — built a complete Angular + NestJS app and managed its AWS deployment from scratch within 3 months."</span>
          </div>

          <div className="dev-property">
            <span className="dev-prop-name">passion</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-string">"AI/ML integration in web applications — A.R.I.A (AI Recruiter Interview Assistant) showcases that passion."</span>
          </div>
        </div>

        <div className="dev-code-line">
          <span className="dev-text-muted">{'}'}</span>
        </div>
      </div>

      <div className="dev-highlights-grid">
        <div className="dev-highlight-item">
          <span className="dev-highlight-icon">💼</span>
          <div>
            <div className="dev-highlight-title">3+ Years Professional Experience</div>
            <div className="dev-highlight-desc">Building enterprise systems at Clark Outsourcing, with international project experience at SOS Global (Australia).</div>
          </div>
        </div>

        <div className="dev-highlight-item">
          <span className="dev-highlight-icon">⚡</span>
          <div>
            <div className="dev-highlight-title">Full Stack Specialist</div>
            <div className="dev-highlight-desc">Angular + Laravel as core stack, with React, NestJS, TypeScript, and NgRx in the toolbelt.</div>
          </div>
        </div>

        <div className="dev-highlight-item">
          <span className="dev-highlight-icon">☁️</span>
          <div>
            <div className="dev-highlight-title">AWS Cloud Architecture</div>
            <div className="dev-highlight-desc">EC2, S3, RDS, SQS, Route 53, Elastic Beanstalk — production environments built and managed.</div>
          </div>
        </div>

        <div className="dev-highlight-item">
          <span className="dev-highlight-icon">🎓</span>
          <div>
            <div className="dev-highlight-title">BS Information Technology</div>
            <div className="dev-highlight-desc">University of the Assumption (2019–2023). Dean's Lister 2022.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
