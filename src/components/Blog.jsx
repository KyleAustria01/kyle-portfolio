import { useState } from 'react';
import Section from './Section';
import posts from '../data/posts';

function Post({ post }) {
  const [open, setOpen] = useState(false);
  const bodyId = `post-${post.id}`;

  return (
    <article className={`post${open ? ' open' : ''}`}>
      <button
        className="post-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
      >
        <span className="post-tag">{post.tag}</span>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <span className="post-meta">
          {post.date} · {post.read}
          <span className="post-cue">{open ? 'close ↑' : 'read →'}</span>
        </span>
      </button>

      {open && (
        <div className="post-body" id={bodyId}>
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Blog() {
  return (
    <Section id="blog" num="05" title="blog">
      <p className="section-lead">
        // Notes on building software people here can actually afford to use.
      </p>
      <div className="post-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Section>
  );
}
