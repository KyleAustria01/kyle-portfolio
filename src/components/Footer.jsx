import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <a href="https://github.com/KyleAustria01" target="_blank" rel="noopener noreferrer" className="footer-link">
            <GitHubIcon size={16} className="inline align-middle mr-1" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/kyle-austria/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <LinkedInIcon size={16} className="inline align-middle mr-1" />
            LinkedIn
          </a>
          <a href="mailto:kyleryanaustria@gmail.com" className="footer-link">
            <Mail size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Email
          </a>
        </div>
        <div className="footer-divider" />
        <p className="footer-copy">
          &copy; {year} <strong>Kyle Ryan Austria</strong>. Built with React, Vite & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
