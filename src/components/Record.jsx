import Section from './Section';
import experience from '../data/experience';
import education from '../data/education';

export default function Record() {
  return (
    <Section id="record" num="03" title="record">
      <ol className="record-list">
        {experience.map((job) => (
          <li className="record-entry" key={job.id}>
            <div className="record-head">
              <div>
                <h3 className="record-role">{job.title}</h3>
                <p className="record-org">{job.company}</p>
              </div>
              <span className="record-dates">{job.dates}</span>
            </div>

            <p className="record-impact">{job.impact}</p>

            <ul className="record-bullets">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <ul className="tag-row">
              {job.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}

        <li className="record-entry">
          <div className="record-head">
            <div>
              <h3 className="record-role">{education.degree}</h3>
              <p className="record-org">
                {education.school} — {education.campus}
              </p>
            </div>
            <span className="record-dates">{education.dates}</span>
          </div>
          <p className="record-impact">{education.achievement}</p>
        </li>
      </ol>
    </Section>
  );
}
