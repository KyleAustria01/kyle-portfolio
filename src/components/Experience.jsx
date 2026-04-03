import experience from '../data/experience';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Experience() {
  const ref = useScrollAnimation();

  return (
    <section id="experience" className="section">
      <div className="container">
        <div ref={ref} className="fade-in-up">
          <div className="section-label">
            <span className="label-dot" />
            Career Timeline
          </div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-desc">
            From OJT to building enterprise-grade systems — here's my professional journey.
          </p>
        </div>

        <div className="experience-timeline">
          {experience.map((item, idx) => (
            <div className="timeline-item" key={item.title + item.company}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <div className="timeline-role">{item.title}</div>
                    <div className="timeline-company">{item.company}</div>
                  </div>
                  <span className="timeline-date">{item.dates}</span>
                </div>
                <ul className="timeline-highlights">
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
