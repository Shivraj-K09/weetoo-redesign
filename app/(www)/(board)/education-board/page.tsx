import { PostsList } from "@/components/board/education-board/post-list";
import { TopPost } from "@/components/board/education-board/top-post";

export default function EducationBoard() {
  return (
    <div className="container flex flex-col gap-4 mx-auto py-4 pb-10 px-4">
      <TopPost />
      <PostsList />
    </div>
  );
}
