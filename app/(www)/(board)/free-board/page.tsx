import { PostsList } from "@/components/board/free-board/post-list";
import { TopPost } from "@/components/board/free-board/top-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Bulletin Board | Weetoo",
  description:
    "Explore the Free Bulletin Board on Weetoo, where you can share and discover insights on technology, finance, and more. Connect with experts and enthusiasts in a vibrant community.",
};

export default function FreeBoard() {
  return (
    <div className="container flex flex-col gap-5 mx-auto py-4 pb-10 px-4">
      <TopPost />
      <PostsList />
    </div>
  );
}
