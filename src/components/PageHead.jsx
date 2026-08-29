import { useEffect } from 'react';
import Glitch from './Glitch';

/** Title block for a standalone route page. Also sets the document title. */
export default function PageHead({ title, blurb, docTitle }) {
  useEffect(() => {
    document.title = docTitle || `${title} — Kyle Ryan Austria`;
    return () => {
      document.title = 'Kyle Ryan Austria — Full Stack Developer';
    };
  }, [title, docTitle]);

  return (
    <header className="page-head">
      <Glitch as="h1" className="page-title" text={title} />
      {blurb && <p className="page-blurb">{blurb}</p>}
    </header>
  );
}
