import Link from '@/components/Link';
import clsx from 'clsx';
import BlogAuthors from '@/components/blog/Authors';

export default function PostItem({ title, category, slug, date, children, authors, wide = false }) {
  return (
    <div>
      <div className="row gx-5 justify-center">
        <div className="col-3">
          <BlogAuthors authors={authors} />
        </div>
        <article className="col-6">
          <Link href={`/blog/${slug}`} className="h3 mb-3">
            {title}
          </Link>
          <div className="markdown">{children}</div>
        </article>
      </div>
    </div>
  );
}
