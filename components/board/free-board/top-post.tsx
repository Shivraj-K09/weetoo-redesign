import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TopPost() {
  const postData = [
    {
      title: "Exploring Quantum Entanglement in Financial Markets",
      excerpt:
        "A deep dive into the theoretical applications of quantum mechanics in predicting market fluctuations and optimizing portfolio strategies.",
      author: {
        name: "Dr. Evelyn Reed",
        avatar: "",
      },
      stats: { views: 12500, likes: 780, comments: 112 },
    },
    {
      title: "The Future of AI in Algorithmic Trading",
      excerpt:
        "Examining upcoming AI trends and their potential to revolutionize high-frequency trading and risk assessment models.",
      author: {
        name: "Johnathan K. Sterling",
        avatar: "",
      },
      stats: { views: 9800, likes: 650, comments: 95 },
    },
    {
      title: "Decentralized Finance: A New Paradigm",
      excerpt:
        "Understanding the core concepts of DeFi, its impact on traditional banking, and the opportunities it presents for investors.",
      author: {
        name: "Aisha Khan",
        avatar: "",
      },
      stats: { views: 15200, likes: 920, comments: 150 },
    },
    {
      title: "Cybersecurity Trends for Fintech in 2025",
      excerpt:
        "Key security challenges and advancements fintech companies must prepare for to protect assets and user data effectively.",
      author: {
        name: "Marcus Chen",
        avatar: "",
      },
      stats: { views: 7500, likes: 430, comments: 60 },
    },
    {
      title: "Blockchain Beyond Cryptocurrency: Use Cases",
      excerpt:
        "Exploring innovative applications of blockchain technology in supply chain management, voting systems, and digital identity.",
      author: {
        name: "Sophia Miller",
        avatar: "",
      },
      stats: { views: 11300, likes: 810, comments: 120 },
    },
    {
      title: "Sustainable Investing: Impact and Returns",
      excerpt:
        "Analyzing the growth of ESG investing and how it aligns financial goals with positive social and environmental outcomes.",
      author: {
        name: "David Green",
        avatar: "",
      },
      stats: { views: 6900, likes: 320, comments: 45 },
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
          href="/free-board/1"
          className="h-[32.76rem] border w-full md:col-span-2 relative rounded-lg overflow-hidden group block"
        >
          <Image
            src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              href={`/free-board/${index + 2}`}
              className="h-64 w-full border relative rounded-lg overflow-hidden group block"
            >
              <Image
                src={
                  index === 0
                    ? "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            href={`/free-board/${index + 4}`}
            className="h-64 w-full border relative rounded-lg overflow-hidden group block"
          >
            <Image
              src={
                index === 0
                  ? "https://images.unsplash.com/photo-1733506260469-8a6a07d95051?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : index === 1
                  ? "https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
