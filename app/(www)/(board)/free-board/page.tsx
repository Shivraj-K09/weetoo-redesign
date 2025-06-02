import { TopPost } from "@/components/board/top-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Bulletin Board | Weetoo",
  description:
    "Explore the Free Bulletin Board on Weetoo, where you can share and discover insights on technology, finance, and more. Connect with experts and enthusiasts in a vibrant community.",
};

export default function FreeBoard() {
  return (
    <div className="container flex flex-col gap-3 mx-auto py-4 pb-10">
      <TopPost />
    </div>
  );
}
