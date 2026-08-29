/**
 * Signal-corruption text. Two offset layers get sliced by clip-path bands so the
 * word looks like a scan that failed to render — warm signal against cool slate.
 *
 * Fires on hover, and once when a section scrolls into view (the `.visible`
 * class on the parent section drives that). Disabled under reduced motion.
 */
export default function Glitch(props) {
  const { text, className = '' } = props;
  const Tag = props.as || 'span';
  return (
    <Tag className={`glitch ${className}`.trim()} data-text={text}>
      <span className="glitch-face">{text}</span>
    </Tag>
  );
}
