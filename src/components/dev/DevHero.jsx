import { useState, useEffect } from 'react';
import { GitHubIcon, LinkedInIcon } from '../Icons';
import { Mail, ArrowRight } from 'lucide-react';

const roles = ['Full Stack Developer', 'Angular Specialist', 'AWS Cloud Engineer', 'Enterprise Software Dev'];

export default function DevHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="dev-section dev-hero">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/home</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">cat README.md</span>
      </div>

      <div className="dev-hero-content">
        <div className="dev-comment">{'// Hello World! Welcome to my portfolio'}</div>

        <h1 className="dev-hero-name">
          <span className="dev-keyword">const </span>
          <span className="dev-function">developer</span>
          <span className="dev-text-muted"> = </span>
          <span className="dev-string">"Kyle Ryan Austria"</span>
          <span className="dev-text-muted">;</span>
        </h1>

        <div className="dev-hero-role">
          <span className="dev-keyword">let </span>
          <span className="dev-function">role</span>
          <span className="dev-text-muted"> = </span>
          <span className="dev-string">"{displayText}</span>
          <span className="dev-cursor">|</span>
          <span className="dev-string">"</span>
          <span className="dev-text-muted">;</span>
        </div>

        <div className="dev-hero-desc">
          <span className="dev-comment">{'/**'}</span>
          <br />
          <span className="dev-comment">{' * Building enterprise web applications with 3+ years of experience.'}</span>
          <br />
          <span className="dev-comment">{' * Specializing in Angular, Laravel, and AWS — turning complex'}</span>
          <br />
          <span className="dev-comment">{' * business requirements into scalable, production-ready systems.'}</span>
          <br />
          <span className="dev-comment">{' */'}</span>
        </div>

        <div className="dev-hero-badge">
          <span className="dev-badge-dot" />
          <span>Available for opportunities</span>
        </div>

        <div className="dev-stats-grid">
          <div className="dev-stat">
            <span className="dev-stat-num">3+</span>
            <span className="dev-stat-label">years</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-num">6+</span>
            <span className="dev-stat-label">projects</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-num">5+</span>
            <span className="dev-stat-label">enterprise</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-num">80%</span>
            <span className="dev-stat-label">efficiency</span>
          </div>
        </div>

        <div className="dev-hero-actions">
          <a href="#contact" className="dev-btn dev-btn-primary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Mail size={14} /> ./contact.sh
          </a>
          <a href="#projects" className="dev-btn dev-btn-secondary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            ls ~/projects/ <ArrowRight size={14} />
          </a>
        </div>

        <div className="dev-socials">
          <a href="https://github.com/KyleAustria01" target="_blank" rel="noopener noreferrer" className="dev-social-link" title="GitHub">
            <GitHubIcon size={16} /> github
          </a>
          <a href="https://www.linkedin.com/in/kyle-austria/" target="_blank" rel="noopener noreferrer" className="dev-social-link" title="LinkedIn">
            <LinkedInIcon size={16} /> linkedin
          </a>
          <a href="mailto:kyleryanaustria@gmail.com" className="dev-social-link" title="Email">
            <Mail size={16} /> email
          </a>
        </div>
      </div>
    </section>
  );
}
