import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TopPost() {
  const postData = [
    {
      title: "Mastering Technical Analysis: A Beginner's Guide",
      excerpt:
        "An essential primer for aspiring traders on chart patterns, indicators, and strategies to read the market with confidence.",
      author: {
        name: "Rachel Kim",
        avatar: "",
      },
      stats: { views: 9700, likes: 680, comments: 89 },
    },
    {
      title: "Risk Management Strategies Every Trader Should Know",
      excerpt:
        "Learn how to manage capital, set stop-loss orders, and use position sizing to protect your portfolio from big losses.",
      author: {
        name: "Michael O'Donnell",
        avatar: "",
      },
      stats: { views: 8400, likes: 540, comments: 72 },
    },
    {
      title: "Understanding Candlestick Patterns for Smarter Trades",
      excerpt:
        "A breakdown of the most common candlestick formations and how to use them for timing market entries and exits.",
      author: {
        name: "Fatima Noor",
        avatar: "",
      },
      stats: { views: 11200, likes: 720, comments: 103 },
    },
    {
      title: "Day Trading vs. Swing Trading: Which is Right for You?",
      excerpt:
        "Compare these two popular trading styles to decide which fits your goals, risk tolerance, and time commitment.",
      author: {
        name: "James Holloway",
        avatar: "",
      },
      stats: { views: 7900, likes: 510, comments: 64 },
    },
    {
      title: "Building a Trading Plan: Discipline Over Emotion",
      excerpt:
        "Discover the components of a strong trading plan and why consistency beats instinct in long-term success.",
      author: {
        name: "Lina Delgado",
        avatar: "",
      },
      stats: { views: 8800, likes: 590, comments: 75 },
    },
    {
      title: "The Psychology of Trading: Controlling Fear and Greed",
      excerpt:
        "Explore mental strategies used by top traders to stay focused, avoid emotional decisions, and maintain discipline.",
      author: {
        name: "Daniel Cho",
        avatar: "",
      },
      stats: { views: 10500, likes: 800, comments: 95 },
    },
  ];

  const formatStat = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Large Card (Top-Left) */}
        <Link
          href="/education-board/1"
          className="h-[32.76rem] border w-full md:col-span-2 relative rounded-lg overflow-hidden group block"
        >
          <Image
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Large technology concept"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
            <h3 className="text-white text-2xl font-semibold truncate mb-1.5">
              {postData[0].title}
            </h3>
            <p className="text-gray-300 text-base line-clamp-2 mb-3">
              {postData[0].excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between text-gray-400">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={postData[0].author.avatar || ""}
                    alt={postData[0].author.name}
                  />
                  <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                    {postData[0].author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-gray-200">
                  {postData[0].author.name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <EyeIcon size={16} />
                  <span>{formatStat(postData[0].stats.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUpIcon size={16} />
                  <span>{formatStat(postData[0].stats.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircleIcon size={16} />
                  <span>{formatStat(postData[0].stats.comments)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Small Cards (Right Column) */}
        <div className="flex flex-col h-full gap-3 md:col-span-1">
          {[postData[1], postData[2]].map((post, index) => (
            <Link
              key={index}
              href={`/education-board/${index + 2}`}
              className="h-64 w-full border relative rounded-lg overflow-hidden group block"
            >
              <Image
                src={
                  index === 0
                    ? "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={
                  index === 0
                    ? "Woman at a computer"
                    : "Abstract technology background"
                }
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
                <h4 className="text-white text-base font-medium truncate mb-1">
                  {post.title}
                </h4>
                <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-between text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={post.author.avatar || ""}
                        alt={post.author.name}
                      />
                      <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-gray-200">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-0.5">
                      <EyeIcon size={14} />
                      <span>{formatStat(post.stats.views)}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <ThumbsUpIcon size={14} />
                      <span>{formatStat(post.stats.likes)}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <MessageCircleIcon size={14} />
                      <span>{formatStat(post.stats.comments)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Small Cards (Bottom Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
        {[postData[3], postData[4], postData[5]].map((post, index) => (
          <Link
            key={index}
            href={`/education-board/${index + 4}`}
            className="h-64 w-full border relative rounded-lg overflow-hidden group block"
          >
            <Image
              src={
                index === 0
                  ? "https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : index === 1
                  ? "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={
                index === 0
                  ? "Modern office with city view"
                  : index === 1
                  ? "Server room with blue lights"
                  : "Colorful abstract background"
              }
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
              <h4 className="text-white text-base font-medium truncate mb-1">
                {post.title}
              </h4>
              <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={post.author.avatar || ""}
                      alt={post.author.name}
                    />
                    <AvatarFallback className="text-xs bg-gray-700 text-gray-300">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-gray-200">
                    {post.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-0.5">
                    <EyeIcon size={14} />
                    <span>{formatStat(post.stats.views)}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <ThumbsUpIcon size={14} />
                    <span>{formatStat(post.stats.likes)}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MessageCircleIcon size={14} />
                    <span>{formatStat(post.stats.comments)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
