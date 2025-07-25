import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PostPageProps, Post } from "@/types/post";
import PostDetailClient from "@/components/post/post-detail-client";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select(
      `*, author:users ( id, first_name, last_name, avatar_url, nickname )`
    )
    .eq("id", id)
    .single();

  if (!post) {
    return {
      title: "Post Not Found | Weetoo",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: `${post.title} | Weetoo`,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const supabase = await createClient();
  const { id, board } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `*, author:users ( id, first_name, last_name, avatar_url, nickname )`
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Format the post data
  const formattedPost: Post = {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || post.content.slice(0, 120),
    board: post.board,
    views: post.views || 0,
    likes: post.likes || 0,
    comments: post.comments || 0,
    createdAt: new Date(post.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: {
      id: post.author?.id || "",
      name:
        post.author?.first_name && post.author?.last_name
          ? `${post.author.first_name} ${post.author.last_name}`
          : "Anonymous",
      nickname: post.author?.nickname,
      avatar: post.author?.avatar_url,
    },
    images: post.images || [],
    tags: post.tags || [],
  };

  return <PostDetailClient post={formattedPost} board={board} />;
}
