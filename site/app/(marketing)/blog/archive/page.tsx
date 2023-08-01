import { blogEnabled } from '@/config/site';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

export default async function BlogArchivePage() {
  const posts = allPosts.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }).reverse();

  if (!blogEnabled) {
    notFound();
  }

  return (
    <>
      {posts.map((post, i) => (
        <div key={post._id}>
          {post._id}
          <a href={post.slug}>{post.title}</a>
        </div>
      ))}
    </>
  );
}
