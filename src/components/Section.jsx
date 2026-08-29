import useScrollAnimation from '../hooks/useScrollAnimation';
import Glitch from './Glitch';

/**
 * `NN — title` header with an optional right-aligned action, then content.
 */
export default function Section({ id, num, title, action, children }) {
  const ref = useScrollAnimation();

  return (
    <section className="section" id={id} ref={ref}>
      <div className="section-head">
        <h2 className="section-title">
          <span className="section-num">{num} —</span>{' '}
          <Glitch text={title} />
        </h2>
        {action && (
          <a className="section-action" href={action.href} target="_blank" rel="noopener noreferrer">
            {action.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
