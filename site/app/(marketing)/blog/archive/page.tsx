import { allPosts } from 'contentlayer/generated';

export default async function BlogArchivePage() {
  const posts = allPosts.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }).reverse();

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
