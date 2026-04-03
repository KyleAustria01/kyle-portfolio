import { GitHubIcon, LinkedInIcon } from '../Icons';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

export default function DevContact() {
  return (
    <section id="contact" className="dev-section">
      <div className="dev-terminal-prompt">
        <span className="dev-prompt-user">kyle@portfolio</span>
        <span className="dev-prompt-sep">:</span>
        <span className="dev-prompt-path">~/contact</span>
        <span className="dev-prompt-dollar">$</span>
        <span className="dev-prompt-cmd">curl -s https://kyle-austria.dev/api/contact | jq</span>
      </div>

      <div className="dev-json-block dev-contact-json">
        <div className="dev-json-brace">{'{'}</div>
        <div className="dev-contact-entries">
          <div className="dev-contact-entry">
            <span className="dev-json-key">"email"</span>
            <span className="dev-text-muted">: </span>
            <a href="mailto:kyleryanaustria@gmail.com" className="dev-json-link">"kyleryanaustria@gmail.com"</a>
            <span className="dev-text-muted">,</span>
          </div>
          <div className="dev-contact-entry">
            <span className="dev-json-key">"github"</span>
            <span className="dev-text-muted">: </span>
            <a href="https://github.com/KyleAustria01" target="_blank" rel="noopener noreferrer" className="dev-json-link">"github.com/KyleAustria01"</a>
            <span className="dev-text-muted">,</span>
          </div>
          <div className="dev-contact-entry">
            <span className="dev-json-key">"linkedin"</span>
            <span className="dev-text-muted">: </span>
            <a href="https://www.linkedin.com/in/kyle-austria/" target="_blank" rel="noopener noreferrer" className="dev-json-link">"linkedin.com/in/kyle-austria"</a>
            <span className="dev-text-muted">,</span>
          </div>
          <div className="dev-contact-entry">
            <span className="dev-json-key">"location"</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-string">"Pampanga, Philippines"</span>
            <span className="dev-text-muted">,</span>
          </div>
          <div className="dev-contact-entry">
            <span className="dev-json-key">"status"</span>
            <span className="dev-text-muted">: </span>
            <span className="dev-green">"Open to opportunities"</span>
          </div>
        </div>
        <div className="dev-json-brace">{'}'}</div>
      </div>

      <div className="dev-contact-cta">
        <div className="dev-comment">{'// Ready to build something great? Let\'s connect!'}</div>
        <a href="mailto:kyleryanaustria@gmail.com" className="dev-btn dev-btn-primary">
          <Mail size={14} /> ./send-email.sh <ArrowRight size={14} />
        </a>
      </div>

      <div className="dev-footer-text">
        <span className="dev-comment">{'// Built with React + Vite + Tailwind CSS'}</span>
        <br />
        <span className="dev-comment">{'// \u00A9'} {new Date().getFullYear()} Kyle Ryan Austria</span>
      </div>
    </section>
  );
}
