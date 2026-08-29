import { useState, useEffect } from 'react';
import Glitch from './Glitch';
import { pickHighlights } from '../data/highlights';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const socials = [
  { label: 'github', href: 'https://github.com/KyleAustria01', Icon: GitHubIcon },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/kyle-austria/', Icon: LinkedInIcon },
  { label: 'email', href: 'mailto:kyleryanaustria@gmail.com', Icon: MailIcon },
];

export default function Hero() {
  const [entered, setEntered] = useState(false);
  // Drawn once per mount, so the set changes on every page load but stays
  // stable while the visitor is reading it.
  const [highlights] = useState(() => pickHighlights(3));

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={`hero page-enter${entered ? ' entered' : ''}`} id="top">
      <div className="hero-head" style={{ '--delay': '0ms' }}>
        <Glitch as="h1" className="hero-name" text="Kyle Ryan Austria" />
        <p className="hero-role">Full Stack Developer · Pampanga, Philippines</p>
      </div>

      <div className="hero-copy" style={{ '--delay': '80ms' }}>
        <p>
          I build the platforms companies actually run on — the ones where a rounding error is
          somebody&apos;s payslip. Four years of that at Clark Outsourcing: an internal CRM covering the
          employee lifecycle, an internal helpdesk, and the automation holding them together.
        </p>
        <p>
          Right now I&apos;m bringing AI into those same processes — retrieval pipelines over internal
          knowledge, not a chatbot bolted on the side. Off the clock I ship things that go live.
        </p>
      </div>

      <div className="hero-socials" style={{ '--delay': '150ms' }}>
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social"
          >
            <social.Icon size={14} />
            {social.label}
            <span className="ext" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>

      <div className="hero-stats" style={{ '--delay': '220ms' }}>
        <div className="hero-stat">
          <span className="hero-stat-value">4+ yrs</span>
          <span className="hero-stat-label">building in production</span>
        </div>
        {highlights.map((h) => (
          <div className="hero-stat" key={h.label}>
            <span className="hero-stat-value">{h.value}</span>
            <span className="hero-stat-label">{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
