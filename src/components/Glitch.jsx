/**
 * Signal-corruption text. Two offset layers get sliced by clip-path bands so the
 * word looks like a scan that failed to render — warm signal against cool slate.
 *
 * Runs on a 3s loop and sustains on hover. Disabled under reduced motion.
 *
 * Any extra props pass through to the element, so a caller that must render a
 * span (inside a button, say) can still declare it as a heading.
 */
export default function Glitch(props) {
  const { text, className = '', as, ...rest } = props;
  const Tag = as || 'span';
  return (
    <Tag className={`glitch ${className}`.trim()} data-text={text} {...rest}>
      <span className="glitch-face">{text}</span>
    </Tag>
  );
}
