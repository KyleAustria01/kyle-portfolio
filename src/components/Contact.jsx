import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Contact() {
  const ref = useScrollAnimation();

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="section-label">
            <span className="label-dot" />
            Get In Touch
          </div>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-desc">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <a href="mailto:kyleryanaustria@gmail.com" className="contact-item">
              <div className="contact-icon">
                <Mail size={20} />
              </div>
              <div>
                <div className="contact-item-label">Email</div>
                <div className="contact-item-value">kyleryanaustria@gmail.com</div>
              </div>
            </a>

            <a href="https://github.com/KyleAustria01" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <GitHubIcon size={20} />
              </div>
              <div>
                <div className="contact-item-label">GitHub</div>
                <div className="contact-item-value">github.com/KyleAustria01</div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/kyle-austria/" target="_blank" rel="noopener noreferrer" className="contact-item">
              <div className="contact-icon">
                <LinkedInIcon size={20} />
              </div>
              <div>
                <div className="contact-item-label">LinkedIn</div>
                <div className="contact-item-value">linkedin.com/in/kyle-austria</div>
              </div>
            </a>

            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div>
                <div className="contact-item-label">Location</div>
                <div className="contact-item-value">Pampanga, Philippines</div>
              </div>
            </div>
          </div>

          <div className="contact-cta-card">
            <h3>Ready to Build Something Great?</h3>
            <p>
              Whether you need a full-stack developer for your next enterprise project, 
              cloud infrastructure setup, or a technical consultation — I'm here to help 
              turn your ideas into production-ready software.
            </p>
            <a href="mailto:kyleryanaustria@gmail.com" className="btn-white">
              Send me an email
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
