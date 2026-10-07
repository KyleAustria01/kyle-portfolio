import Section from './Section';

const rows = [
  ['last role', 'Full Stack Developer, Clark Outsourcing — May 2022 to Oct 2026'],
  ['primary', 'Angular · Laravel · AWS'],
  ['secondary', 'Node · NestJS · Prisma · Python · FastAPI'],
  ['ai track', 'RAG pipelines · Pinecone · Elasticsearch'],
  ['education', "BS Information Technology, University of the Assumption — Dean's Lister 2022"],
  ['open to', 'Full-time · Contract · Remote — available from Nov 2026'],
];

export default function Summary() {
  return (
    <Section id="summary" num="01" title="summary">
      <dl className="row-list">
        {rows.map(([label, value]) => (
          <div className="row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
