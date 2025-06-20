import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TopPost() {
  const postData = [
    {
      title: "Neurofinance: How Brain Science Is Shaping Investment Behavior",
      excerpt:
        "Investigating the intersection of neuroscience and finance to understand how emotions and cognition influence market decisions.",
      author: {
        name: "Dr. Lara Thompson",
        avatar: "",
      },
      stats: { views: 8700, likes: 610, comments: 83 },
    },
    {
      title: "Quantum Computing and Its Disruption of Cryptographic Finance",
      excerpt:
        "Evaluating the threat and promise quantum computing poses to encryption standards in the global financial system.",
      author: {
        name: "Rajiv Malhotra",
        avatar: "",
      },
      stats: { views: 10200, likes: 740, comments: 101 },
    },
    {
      title: "The Rise of Robo-Advisors: Personal Finance in the AI Era",
      excerpt:
        "How automated financial advisors are democratizing investment strategies and reshaping wealth management.",
      author: {
        name: "Emily Zhao",
        avatar: "",
      },
      stats: { views: 9400, likes: 680, comments: 77 },
    },
    {
      title: "Tokenized Assets: Bridging Real Estate with Blockchain",
      excerpt:
        "A look at how tokenization is transforming property investment through fractional ownership and global access.",
      author: {
        name: "Carlos Mendes",
        avatar: "",
      },
      stats: { views: 10800, likes: 790, comments: 115 },
    },
    {
      title: "Gamification in Fintech: Engaging the Next Generation",
      excerpt:
        "Exploring how game mechanics in financial apps are boosting user engagement and financial literacy.",
      author: {
        name: "Tanya Williams",
        avatar: "",
      },
      stats: { views: 7600, likes: 520, comments: 66 },
    },
    {
      title: "Predictive Analytics in Credit Scoring",
      excerpt:
        "Understanding how machine learning is enhancing credit assessment accuracy and reducing default risk.",
      author: {
        name: "Leonard Bishop",
        avatar: "",
      },
      stats: { views: 8900, likes: 610, comments: 88 },
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
          href="/profit-board/1"
          className="h-[32.76rem] border w-full md:col-span-2 relative rounded-lg overflow-hidden group block"
        >
          <Image
            src="https://images.unsplash.com/photo-1633158829875-e5316a358c6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              href={`/profit-board/${index + 2}`}
              className="h-64 w-full border relative rounded-lg overflow-hidden group block"
            >
              <Image
                src={
                  index === 0
                    ? "https://images.unsplash.com/photo-1635236269199-3c71295855b3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1707902665498-a202981fb5ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            href={`/profit-board/${index + 4}`}
            className="h-64 w-full border relative rounded-lg overflow-hidden group block"
          >
            <Image
              src={
                index === 0
                  ? "https://images.unsplash.com/photo-1612197527762-8cfb55b618d1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : index === 1
                  ? "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
