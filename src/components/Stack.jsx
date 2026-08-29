import Section from './Section';
import skills from '../data/skills';

export default function Stack() {
  return (
    <Section id="stack" num="02" title="stack">
      <div className="stack-groups">
        {skills.map((group) => (
          <div className="stack-group" key={group.id}>
            <div className="stack-head">
              <h3 className="stack-label">{group.label}</h3>
              <p className="stack-note">{group.note}</p>
            </div>
            <ul className="stack-items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
