import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import posts from '../data/posts';

export default function BlogIndex() {
  return (
    <div className="route-page">
      <PageHead
        title="blog"
        blurb="Notes on building software people here can actually afford to use."
      />

      <ol className="post-list">
        {posts.map((post) => (
          <li className="post-row" key={post.slug}>
            <Link className="post-link" to={`/blog/${post.slug}`}>
              <span className="post-date">{post.date}</span>
              <span className="post-main">
                <span className="post-tag">{post.tag}</span>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <span className="post-cue">
                  Read <span aria-hidden="true">→</span> · {post.read}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
