"use client";
import { Post } from "@/components/board/post-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Calendar,
  CheckCircle,
  ChevronLeftIcon,
  Clock,
  Eye,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  // Remove HTML tags and count words
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// const categoryColors: Record<string, string> = {
//   Strategy: "bg-blue-500 text-white",
//   Analysis: "bg-purple-500 text-white",
//   News: "bg-green-500 text-white",
//   Discussion: "bg-orange-500 text-white",
//   Tips: "bg-yellow-500 text-black",
//   Security: "bg-red-500 text-white",
// };

type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  pinned?: boolean;
};

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "CryptoGuru",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      username: "@CryptoGuru",
    },
    content:
      '<span class="font-semibold">@SatoshiFan</span> Great insights! I think Bitcoin will surprise us all this year.',
    createdAt: "2 hours ago",
    likes: 7,
    pinned: true,
  },
  {
    id: "2",
    user: {
      name: "AltcoinQueen",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      username: "@AltcoinQueen",
    },
    content: "I'm bullish on ETH and SOL. What's everyone else watching?",
    createdAt: "1 hour ago",
    likes: 3,
  },
  {
    id: "3",
    user: {
      name: "DeFiDegen",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      username: "@DeFiDegen",
    },
    content: "Don't forget to DYOR! Too many scams out there lately.",
    createdAt: "45 minutes ago",
    likes: 2,
  },
  {
    id: "4",
    user: {
      name: "NFTNerd",
      avatar: "https://randomuser.me/api/portraits/men/88.jpg",
      username: "@NFTNerd",
    },
    content: "Love the meme section 😂 Keep them coming!",
    createdAt: "30 minutes ago",
    likes: 1,
  },
  {
    id: "5",
    user: {
      name: "SatoshiFan",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      username: "@SatoshiFan",
    },
    content: "❤️ This community is the best!",
    createdAt: "just now",
    likes: 0,
  },
];

function CommentTextarea() {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 170; // px, adjust as needed

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height =
        Math.min(textarea.scrollHeight, MAX_HEIGHT) + "px";
    }
  }, [value]);

  return (
    <form className="flex-1 flex flex-col gap-2">
      <textarea
        ref={textareaRef}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none overflow-auto"
        placeholder="Add a comment..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        style={{ maxHeight: MAX_HEIGHT, minHeight: 20 }}
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={!value.trim()}>
          Comment
        </Button>
      </div>
    </form>
  );
}

interface PostDetailClientProps {
  post: Post | undefined;
  board: string;
}

export default function PostDetailClient({
  post,
  board,
}: PostDetailClientProps) {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!post) return <div className="text-center py-20">Post not found.</div>;

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Go Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition mb-8 cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Go Back
        </button>
        <article>
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.author.avatar || ""}
                    alt={post.author.name}
                  />
                  <AvatarFallback>
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-1.5">
                    {post.author.name}
                    {post.author.verified && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {post.author.username}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
            <div className="h-2" />
            <div className="flex items-center gap-6 text-xs text-muted-foreground mb-6 mt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{post.createdAt}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                <span>{post.views} views</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                <span>{readingTime}</span>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="mb-8">
              {Array.isArray(post.image) ? (
                <div>
                  <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                      {post.image.map((img: string, index: number) => (
                        <CarouselItem key={index}>
                          <img
                            src={img}
                            alt={`${post.title} image ${index + 1}`}
                            className="rounded-lg w-full object-cover aspect-video"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  {post.image.length > 1 && (
                    <div className="flex justify-center gap-2 mt-2">
                      {post.image.map((img: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                        >
                          <img
                            src={img}
                            alt={`thumbnail ${index + 1}`}
                            className={cn(
                              "h-16 w-24 object-cover rounded-md transition-all",
                              current === index
                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "opacity-50 hover:opacity-100"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-lg w-full object-cover aspect-video"
                />
              )}
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground mr-2">
                Tags:
              </span>
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div
            className="prose prose-lg dark:prose-invert max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Comment Section */}
          <div className="my-12">
            <h2 className="text-lg font-semibold mb-6">
              {mockComments.length} Comments
            </h2>
            {/* Comment Box */}
            <div className="flex items-start gap-3 mb-8">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={post.author.avatar || ""}
                  alt={post.author.name}
                />
                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <CommentTextarea />
            </div>
            {/* Comments List */}
            <div className="flex flex-col gap-8">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 group">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>
                      {comment.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm">
                        {comment.user.username}
                      </span>
                      {comment.pinned && (
                        <span className="inline-block px-2 py-0.5 bg-muted rounded text-xs font-semibold">
                          Pinned
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {comment.createdAt}
                      </span>
                    </div>
                    <div
                      className="text-sm mb-2"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition">
                        <ThumbsUp className="h-4 w-4" />
                        {comment.likes}
                      </button>
                      <button className="hover:text-primary transition">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="mt-12">
            <div className="flex items-center justify-between border-t border-border pt-6">
              <div className="flex items-center gap-6 text-muted-foreground text-sm mt-12 mb-2">
                <button className="flex items-center gap-1.5 hover:text-primary transition">
                  <ThumbsUp className="h-5 w-5" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition">
                  <MessageSquare className="h-5 w-5" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition">
                  <Send className="h-5 w-5" />
                  Share
                </button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                More amazing articles coming soon!
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
