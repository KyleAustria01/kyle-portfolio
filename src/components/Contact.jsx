import Section from './Section';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const channels = [
  {
    label: 'Email',
    value: 'kyleryanaustria@gmail.com',
    href: 'mailto:kyleryanaustria@gmail.com',
    Icon: MailIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kyle-austria',
    href: 'https://www.linkedin.com/in/kyle-austria/',
    Icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/KyleAustria01',
    href: 'https://github.com/KyleAustria01',
    Icon: GitHubIcon,
  },
];

export default function Contact() {
  return (
    <Section id="contact" num="05" title="contact">
      <div className="prose">
        <p className="lede">
          Open to full-time and contract work — anything that needs an Angular, Laravel, Node, or Python
          system taken from schema through to deployment.
        </p>
      </div>

      <ul className="channel-list">
        {channels.map((channel) => (
          <li key={channel.label}>
            <a className="channel" href={channel.href} target="_blank" rel="noopener noreferrer">
              <span className="channel-icon">
                <channel.Icon size={16} />
              </span>
              <span className="channel-label">{channel.label}</span>
              <span className="channel-value">{channel.value}</span>
              <span className="channel-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <dl className="field-list">
        <div className="field-row">
          <dt className="field-label">Response</dt>
          <dd className="field-value">Usually within 24 hours</dd>
        </div>
        <div className="field-row">
          <dt className="field-label">Timezone</dt>
          <dd className="field-value">GMT+8 — Pampanga, Philippines</dd>
        </div>
        <div className="field-row">
          <dt className="field-label">Open to</dt>
          <dd className="field-value">Full-time · Contract · Remote</dd>
        </div>
      </dl>
    </Section>
  );
}
