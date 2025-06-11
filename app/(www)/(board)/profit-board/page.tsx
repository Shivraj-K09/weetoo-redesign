import { PostsList } from "@/components/board/profit-board/post-list";
import { TopPost } from "@/components/board/profit-board/top-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Board | Weetoo",
  description:
    "Explore the Profit Board on Weetoo, where you can share and discover insights on financial success stories. Connect with experts and enthusiasts in a vibrant community.",
};

export default function ProfitBoard() {
  return (
    <div className="container flex flex-col gap-4 mx-auto py-4 pb-10 px-4">
      <TopPost />
      <PostsList />
    </div>
  );
}
