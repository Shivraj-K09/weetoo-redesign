export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  category:
    | "Breaking News"
    | "Market Analysis"
    | "Regulatory"
    | "Technology"
    | "DeFi"
    | "NFTs";
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title:
      "Bitcoin Reaches New All-Time High as Institutional Adoption Accelerates",
    excerpt:
      "Major financial institutions continue to embrace cryptocurrency, driving Bitcoin to unprecedented levels as regulatory clarity improves globally.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop",
    author: {
      id: "author1",
      name: "Sarah Johnson",
      username: "@sarahj_crypto",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Breaking News",
    tags: ["Bitcoin", "Institutional", "ATH"],
    publishedAt: "2 hours ago",
    readTime: 5,
    views: 15420,
    likes: 342,
    comments: 89,
    isFeatured: true,
    isBreaking: true,
  },
  {
    id: "2",
    title: "Ethereum 2.0 Staking Rewards Hit Record High Amid Network Upgrades",
    excerpt:
      "Ethereum validators are seeing unprecedented returns as the network continues its transition to proof-of-stake consensus mechanism.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2069&auto=format&fit=crop",
    author: {
      id: "author2",
      name: "Michael Chen",
      username: "@michael_eth",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Technology",
    tags: ["Ethereum", "Staking", "ETH2.0"],
    publishedAt: "4 hours ago",
    readTime: 7,
    views: 12850,
    likes: 298,
    comments: 67,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "3",
    title:
      "SEC Approves First Spot Bitcoin ETF, Opening Floodgates for Institutional Investment",
    excerpt:
      "The Securities and Exchange Commission has finally approved the first spot Bitcoin ETF, marking a historic moment for cryptocurrency adoption.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author3",
      name: "Emily Rodriguez",
      username: "@emily_reg",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Regulatory",
    tags: ["SEC", "ETF", "Bitcoin", "Regulation"],
    publishedAt: "6 hours ago",
    readTime: 6,
    views: 18200,
    likes: 456,
    comments: 123,
    isFeatured: true,
    isBreaking: true,
  },
  {
    id: "4",
    title: "DeFi Protocol Launches Revolutionary Cross-Chain Bridge Technology",
    excerpt:
      "A new decentralized finance protocol has introduced groundbreaking cross-chain bridge technology, enabling seamless asset transfers across multiple blockchains.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author4",
      name: "David Kim",
      username: "@david_defi",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    category: "DeFi",
    tags: ["DeFi", "Cross-chain", "Bridge", "Technology"],
    publishedAt: "8 hours ago",
    readTime: 8,
    views: 9800,
    likes: 187,
    comments: 54,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "5",
    title: "Major NFT Marketplace Announces Zero-Fee Trading for Limited Time",
    excerpt:
      "Leading NFT marketplace OpenSea has announced a temporary zero-fee trading period to boost activity and attract new users to the platform.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author5",
      name: "Alex Thompson",
      username: "@alex_nft",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "NFTs",
    tags: ["NFT", "OpenSea", "Trading", "Marketplace"],
    publishedAt: "12 hours ago",
    readTime: 4,
    views: 7650,
    likes: 234,
    comments: 78,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "6",
    title: "Crypto Market Cap Surpasses $3 Trillion as Altcoin Season Begins",
    excerpt:
      "The total cryptocurrency market capitalization has exceeded $3 trillion for the first time, driven by strong performance across alternative cryptocurrencies.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author6",
      name: "Lisa Wang",
      username: "@lisa_markets",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Market Analysis",
    tags: ["Market Cap", "Altcoins", "Bull Market"],
    publishedAt: "1 day ago",
    readTime: 6,
    views: 11200,
    likes: 345,
    comments: 92,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "7",
    title:
      "Central Bank Digital Currency Pilot Program Launches in Five Countries",
    excerpt:
      "Five major economies have simultaneously launched pilot programs for their central bank digital currencies, marking a significant step toward digital money adoption.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author7",
      name: "Robert Martinez",
      username: "@robert_cbdc",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Regulatory",
    tags: ["CBDC", "Central Bank", "Digital Currency"],
    publishedAt: "1 day ago",
    readTime: 9,
    views: 8900,
    likes: 156,
    comments: 43,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "8",
    title:
      "Layer 2 Solutions See 400% Growth in Transaction Volume This Quarter",
    excerpt:
      "Ethereum Layer 2 scaling solutions have experienced explosive growth, with transaction volumes increasing by 400% compared to the previous quarter.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author8",
      name: "Jennifer Lee",
      username: "@jen_layer2",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    category: "Technology",
    tags: ["Layer 2", "Scaling", "Ethereum", "Growth"],
    publishedAt: "2 days ago",
    readTime: 7,
    views: 6500,
    likes: 189,
    comments: 67,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "9",
    title: "Crypto Adoption in Emerging Markets Reaches All-Time High",
    excerpt:
      "Cryptocurrency adoption in emerging markets has reached unprecedented levels, driven by inflation hedging and financial inclusion needs.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author9",
      name: "Carlos Silva",
      username: "@carlos_emerging",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    category: "Market Analysis",
    tags: ["Adoption", "Emerging Markets", "Financial Inclusion"],
    publishedAt: "2 days ago",
    readTime: 8,
    views: 9200,
    likes: 267,
    comments: 85,
    isFeatured: false,
    isBreaking: false,
  },
  {
    id: "10",
    title: "Web3 Gaming Revenue Projected to Reach $50 Billion by 2025",
    excerpt:
      "Industry analysts predict that Web3 gaming revenue will reach $50 billion by 2025, driven by play-to-earn mechanics and NFT integration.",
    content: "Full article content...",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    author: {
      id: "author10",
      name: "Kevin Park",
      username: "@kevin_gaming",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    category: "Technology",
    tags: ["Web3", "Gaming", "Play-to-Earn", "NFT"],
    publishedAt: "3 days ago",
    readTime: 5,
    views: 7800,
    likes: 198,
    comments: 56,
    isFeatured: false,
    isBreaking: false,
  },
];
