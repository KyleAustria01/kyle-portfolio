import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import Glitch from './Glitch';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const socials = [
  { label: 'github', href: 'https://github.com/KyleAustria01', Icon: GitHubIcon },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/kyle-austria/', Icon: LinkedInIcon },
  { label: 'email', href: 'mailto:kyleryanaustria@gmail.com', Icon: MailIcon },
];

const resumeHref = `${import.meta.env.BASE_URL}resume/Kyle-Ryan-Austria-Resume.pdf`;

const stats = [
  ['4+ yrs', 'shipping'],
  ['5', 'platforms'],
  ['80%', 'payroll time cut'],
  ['2', 'live side projects'],
];

export default function Hero() {
  const [entered, setEntered] = useState(false);

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
        <a href={resumeHref} download className="hero-social">
          <Download size={14} />
          resume
        </a>
      </div>

      <div className="hero-stats" style={{ '--delay': '220ms' }}>
        {stats.map(([value, label]) => (
          <div className="hero-stat" key={label}>
            <span className="hero-stat-value">{value}</span>
            <span className="hero-stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
