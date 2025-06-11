"use client";

import type React from "react";

import { useMemo, useState, useCallback, memo, useEffect, useRef } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MOCK_NEWS_ARTICLES, type NewsArticle } from "./news-data";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
      ease: "easeOut",
    },
  }),
};

const ITEMS_PER_LOAD = 8; // Load 8 items at a time

// Enhanced News Card with improved design and 4-column layout
const NewsCard = memo(
  ({ article, index }: { article: NewsArticle; index: number }) => {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="group"
      >
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-background hover:border-indigo-300 dark:hover:border-indigo-600 hover:-translate-y-1 h-full">
          {/* Image Section - Minimal padding and reduced spacing */}
          <div className="p-2">
            <div className="h-48 w-full relative overflow-hidden rounded-xl">
              <Image
                src={article.image || ""}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge Overlay */}
              <div className="absolute top-4 left-4">
                <Badge className="backdrop-blur-md shadow-lg text-xs font-semibold px-3 py-1.5 rounded-full">
                  {article.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content Section - Minimal gap between image and content */}
          <div className="px-4 pb-4 pt-1 flex flex-col justify-between flex-grow">
            <div className="space-y-2">
              {/* Title - Fixed height and overflow issues */}
              <h3 className="text-base font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2 h-[2.75rem]">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed h-[4.5rem]">
                {article.excerpt}
              </p>
            </div>

            {/* Footer with Published Date and Read More */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              {/* Published Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>

              {/* Read More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200 group/link hover:gap-3"
              >
                Read More
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
NewsCard.displayName = "NewsCard";

// Loading skeleton component
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="animate-pulse">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-background h-full">
          <div className="p-2">
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
          <div className="px-4 pb-4 pt-1 space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
));
LoadingSkeleton.displayName = "LoadingSkeleton";

export const NewsList = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Filter articles based on search
  const filteredArticles = useMemo(() => {
    let filtered = MOCK_NEWS_ARTICLES;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery]);

  // Get currently displayed articles
  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, displayedItems);
  }, [filteredArticles, displayedItems]);

  const hasMore = displayedItems < filteredArticles.length;

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedItems((prev) =>
        Math.min(prev + ITEMS_PER_LOAD, filteredArticles.length)
      );
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, filteredArticles.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // Reset displayed items when search changes
  useEffect(() => {
    setDisplayedItems(ITEMS_PER_LOAD);
  }, [searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="border-b pb-4 mt-2 text-center sm:text-left">
        <h2 className="text-3xl font-bold">Latest News</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-0.5">
          Stay updated with the latest cryptocurrency developments
        </p>
      </div>

      {/* Search Bar - Left Aligned */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search articles, tags, or content..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-12 h-12 border-gray-300 dark:border-gray-600 rounded-xl bg-background shadow-sm focus:shadow-md transition-shadow"
        />
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 border border-gray-200 dark:border-gray-800 rounded-2xl bg-background">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        </div>
      )}

      {/* News Grid with Infinite Scroll */}
      {filteredArticles.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>

          {/* Loading Skeleton */}
          {isLoading && <LoadingSkeleton />}

          {/* Intersection Observer Target */}
          <div
            ref={observerRef}
            className="h-10 flex items-center justify-center"
          >
            {hasMore && !isLoading && (
              <p className="text-sm">Scroll down to load more articles...</p>
            )}
            {!hasMore && displayedArticles.length > ITEMS_PER_LOAD && (
              <p className="text-muted-foreground text-sm">
                You&apos;ve reached the end of the articles
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
});

NewsList.displayName = "NewsList";
