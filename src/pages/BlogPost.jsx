import { useParams, Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import posts from '../data/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="route-page">
        <PageHead title="not found" blurb="No post lives at that address." />
        <Link className="text-btn" to="/blog">
          <span aria-hidden="true">← </span>Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="route-page">
      <Link className="back-link" to="/blog">
        <span aria-hidden="true">← </span>blog
      </Link>

      <PageHead title={post.title} docTitle={`${post.title} — Kyle Ryan Austria`} />

      <p className="article-meta">
        <span className="post-tag">{post.tag}</span>
        {post.date} · {post.read}
      </p>

      <article className="article">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      <Link className="text-btn" to="/blog">
        <span aria-hidden="true">← </span>Back to blog
      </Link>
    </div>
  );
}
