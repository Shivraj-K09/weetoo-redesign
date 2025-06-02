export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string; // For potential future use on a detail page
  image: string; // Placeholder for table thumbnails
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  category: "Strategy" | "Analysis" | "News" | "Discussion";
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  createdAt: string; // e.g., "2 hours ago"
  updatedAt: string;
  isPinned?: boolean;
  isHot?: boolean;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Advanced Bitcoin Trading Strategies for 2024",
    excerpt:
      "Discover the most effective Bitcoin trading strategies that professional traders are using in 2024. Learn about risk management, technical analysis, and market psychology.",
    content: "Full content for Advanced Bitcoin Trading Strategies...",
    image: "",
    author: {
      id: "user1",
      name: "Alex Thompson",
      username: "@alex_t",
      avatar: "",
      verified: true,
    },
    category: "Strategy",
    tags: ["Bitcoin", "Trading", "Crypto", "Tips"],
    views: 15420,
    likes: 342,
    comments: 89,
    createdAt: "2 hours ago",
    updatedAt: "2 hours ago",
    isPinned: true,
    isHot: true,
  },
  {
    id: "2",
    title: "Ethereum Price Analysis: What to Expect Next Week",
    excerpt:
      "Technical analysis of Ethereum's recent price movements and predictions for the upcoming week. Key support and resistance levels identified.",
    content: "Full content for Ethereum Price Analysis...",
    image: "",
    author: {
      id: "user2",
      name: "Sarah Kim",
      username: "@sarah_k",
      avatar: "",
      verified: true,
    },
    category: "Analysis",
    tags: ["Ethereum", "Technical Analysis", "Market"],
    views: 12850,
    likes: 298,
    comments: 67,
    createdAt: "4 hours ago",
    updatedAt: "4 hours ago",
    isPinned: false,
    isHot: true,
  },
  {
    id: "3",
    title: "Breaking: Major Exchange Announces New Trading Pairs",
    excerpt:
      "A leading cryptocurrency exchange has just announced the addition of several new trading pairs, including some highly anticipated altcoins.",
    content: "Full content for Major Exchange News...",
    image: "",
    author: {
      id: "user3",
      name: "Michael Chen",
      username: "@michael_c",
      avatar: "",
      verified: false,
    },
    category: "News",
    tags: ["Exchange", "Altcoins", "Breaking News"],
    views: 11200,
    likes: 156,
    comments: 43,
    createdAt: "6 hours ago",
    updatedAt: "6 hours ago",
    isPinned: false,
    isHot: false,
  },
  {
    id: "4",
    title: "Risk Management Techniques Every Trader Should Know",
    excerpt:
      "Essential risk management strategies that can help protect your trading capital and improve your long-term profitability in volatile markets.",
    content: "Full content for Risk Management Techniques...",
    image: "",
    author: {
      id: "user4",
      name: "Emma Wilson",
      username: "@emma_w",
      avatar: "",
      verified: true,
    },
    category: "Strategy",
    tags: ["Risk Management", "Trading Psychology"],
    views: 9800,
    likes: 287,
    comments: 92,
    createdAt: "8 hours ago",
    updatedAt: "8 hours ago",
    isPinned: false,
    isHot: true,
  },
  {
    id: "5",
    title: "DeFi Market Update: Yield Farming Opportunities",
    excerpt:
      "Latest updates from the DeFi space including new yield farming opportunities, protocol updates, and risk assessments for various platforms.",
    content: "Full content for DeFi Market Update...",
    image: "",
    author: {
      id: "user5",
      name: "David Lee",
      username: "@david_l",
      avatar: "",
      verified: true,
    },
    category: "Analysis",
    tags: ["DeFi", "Yield Farming", "Protocols"],
    views: 8650,
    likes: 198,
    comments: 54,
    createdAt: "12 hours ago",
    updatedAt: "12 hours ago",
    isPinned: false,
    isHot: false,
  },
  {
    id: "6",
    title: "Market Psychology: Understanding Fear and Greed",
    excerpt:
      "How emotions drive market movements and practical tips for maintaining discipline during volatile trading periods.",
    content: "Full content for Market Psychology...",
    image: "",
    author: {
      id: "user6",
      name: "Sophia Garcia",
      username: "@sophia_g",
      avatar: "",
      verified: false,
    },
    category: "Discussion",
    tags: ["Psychology", "Market Sentiment", "Discipline"],
    views: 7920,
    likes: 234,
    comments: 78,
    createdAt: "1 day ago",
    updatedAt: "1 day ago",
    isPinned: false,
    isHot: false,
  },
  {
    id: "7",
    title: "Top 5 Altcoins to Watch in Q3 2024",
    excerpt:
      "An in-depth look at promising altcoins with strong fundamentals and potential for growth in the third quarter of 2024.",
    content: "Full content for Top 5 Altcoins...",
    image: "",
    author: {
      id: "user7",
      name: "Chris Miller",
      username: "@chris_m",
      avatar: "",
      verified: true,
    },
    category: "Analysis",
    tags: ["Altcoins", "Investment", "Q3 2024"],
    views: 10500,
    likes: 310,
    comments: 75,
    createdAt: "1 day ago",
    updatedAt: "1 day ago",
    isPinned: false,
    isHot: true,
  },
  {
    id: "8",
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    excerpt:
      "A simple explanation of blockchain technology, how it works, and its implications beyond cryptocurrencies.",
    content: "Full content for Blockchain Beginner's Guide...",
    image: "",
    author: {
      id: "user8",
      name: "Jessica Brown",
      username: "@jessica_b",
      avatar: "",
      verified: false,
    },
    category: "Discussion",
    tags: ["Blockchain", "Technology", "Education"],
    views: 6500,
    likes: 180,
    comments: 50,
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
    isPinned: false,
    isHot: false,
  },
  {
    id: "9",
    title: "Navigating Crypto Taxes: What You Need to Know",
    excerpt:
      "A guide to understanding cryptocurrency taxation, reporting requirements, and tips for staying compliant.",
    content: "Full content for Crypto Taxes Guide...",
    image: "",
    author: {
      id: "user9",
      name: "Kevin White",
      username: "@kevin_w",
      avatar: "",
      verified: true,
    },
    category: "News",
    tags: ["Crypto Tax", "Regulations", "Compliance"],
    views: 7200,
    likes: 150,
    comments: 30,
    createdAt: "2 days ago",
    updatedAt: "2 days ago",
    isPinned: false,
    isHot: false,
  },
  {
    id: "10",
    title: "The Impact of AI on Cryptocurrency Trading",
    excerpt:
      "Exploring how artificial intelligence is transforming trading strategies, market analysis, and risk assessment in the crypto space.",
    content: "Full content for AI in Crypto Trading...",
    image: "",
    author: {
      id: "user10",
      name: "Olivia Davis",
      username: "@olivia_d",
      avatar: "",
      verified: true,
    },
    category: "Strategy",
    tags: ["AI", "Trading Bots", "Machine Learning"],
    views: 9100,
    likes: 260,
    comments: 65,
    createdAt: "3 days ago",
    updatedAt: "3 days ago",
    isPinned: false,
    isHot: true,
  },
];
