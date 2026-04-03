import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Hero() {
  const ref = useScrollAnimation();

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid" ref={ref}>
          {/* Left: Text Content */}
          <div className="hero-content fade-in-up visible">
            <div className="hero-badge">
              <span className="badge-dot" />
              Available for opportunities
            </div>

            <h1 className="hero-name">
              Hi, I'm{' '}
              <span className="gradient-text">Kyle Austria</span>
            </h1>

            <p className="hero-tagline">
              Full Stack Developer with 3+ years of experience building enterprise web applications. 
              I specialize in <strong>Angular</strong>, <strong>Laravel</strong>, and <strong>AWS</strong> — 
              turning complex business requirements into scalable, production-ready systems.
            </p>

            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                <Mail size={16} />
                Get in Touch
              </a>
              <a href="#projects" className="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                View Projects
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/KyleAustria01" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <GitHubIcon size={18} />
              </a>
              <a href="https://www.linkedin.com/in/kyle-austria/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
              <a href="mailto:kyleryanaustria@gmail.com" className="social-link" title="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="hero-stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Exp.</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">6+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Enterprise Systems</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">80%</div>
                <div className="stat-label">Efficiency Gain</div>
              </div>
            </div>
            <div className="hero-location-badge">
              <MapPin size={16} />
              Pampanga, Philippines
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
