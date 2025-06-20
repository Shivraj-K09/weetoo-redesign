import { BOARD_POSTS } from "@/components/board/post-data";
import PostDetailClient from "./PostDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string; id: string }>;
}) {
  const { board, id } = await params;
  const posts = BOARD_POSTS[board] || [];
  const post = posts.find((p) => p.id === id);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: Array.isArray(post.image) ? post.image[0] : post.image,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ board: string; id: string }>;
}) {
  const { board, id } = await params;
  const posts = BOARD_POSTS[board] || [];
  const post = posts.find((p) => p.id === id);
  return <PostDetailClient post={post} board={board} />;
}
