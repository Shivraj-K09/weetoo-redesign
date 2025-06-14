"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Abstract Shapes */}
          <motion.div
            className="absolute top-20 left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-8 sm:right-16 md:right-32 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-lg rotate-45"
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
              rotate: [45, 60, 45],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-8 sm:left-20 md:left-40 w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-lg"
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-8 sm:right-12 md:right-20 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 rounded-lg bg-gradient-to-r from-purple-400/10 to-blue-400/10 blur-md"
            animate={{
              y: [0, 20, 0],
              x: [0, -12, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Animated Curved Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
          >
            <defs>
              <linearGradient
                id="animatedGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.2)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,600 Q600,400 1200,600"
              stroke="url(#animatedGrad)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,650 Q600,450 1200,650"
              stroke="url(#animatedGrad)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>

          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-blue-500/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[400px] h-[200px] bg-gradient-to-r from-purple-500/6 to-blue-500/6 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 px-6 py-2 text-sm">
                  Next Generation Trading Platform
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Master the Art of
                <motion.span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {" "}
                  Trading
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience real trading without real risks. Create rooms, share
                insights, and climb the leaderboards while learning the art of
                trading.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 dark:text-white px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <Link href="/trading">Start Trading</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50 px-8 py-6 text-lg rounded-xl"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 dark:from-black dark:to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 px-4 py-1.5 text-sm">
              Top Performers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Community Leaderboards
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              See who&apos;s leading the pack in different categories and get
              inspired to climb the ranks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-slate-700/50">
              {/* Return Rate */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700/30">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                      Return Rate
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Weekly Performance
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "Alex Chen",
                      value: "+95.0%",
                      change: "(+2.1%)",
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      rank: 2,
                      name: "Sarah Kim",
                      value: "+90.0%",
                      change: "(+1.8%)",
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      rank: 3,
                      name: "Mike Ross",
                      value: "+85.0%",
                      change: "(+1.5%)",
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      rank: 4,
                      name: "Emma Liu",
                      value: "+80.0%",
                      change: "(+1.2%)",
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      rank: 5,
                      name: "John Doe",
                      value: "+75.0%",
                      change: "(+0.9%)",
                      color: "text-emerald-600 dark:text-emerald-400",
                    },
                  ].map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1
                            ? "bg-yellow-500 text-black"
                            : trader.rank === 2
                            ? "bg-gray-400 text-black"
                            : trader.rank === 3
                            ? "bg-orange-500 text-black"
                            : "bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-white"
                        }`}
                      >
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                          {trader.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold text-sm ${trader.color}`}
                          >
                            {trader.value}
                          </span>
                          <span className="text-gray-500 dark:text-slate-400 text-xs">
                            {trader.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Money */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700/30">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                      Virtual Money
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Total Holdings
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "David Park",
                      value: "$900K",
                      change: "(+$50K)",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      rank: 2,
                      name: "Lisa Wang",
                      value: "$800K",
                      change: "(+$40K)",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      rank: 3,
                      name: "Tom Smith",
                      value: "$700K",
                      change: "(+$35K)",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      rank: 4,
                      name: "Anna Lee",
                      value: "$600K",
                      change: "(+$30K)",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      rank: 5,
                      name: "Chris Wu",
                      value: "$500K",
                      change: "(+$25K)",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                  ].map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1
                            ? "bg-yellow-500 text-black"
                            : trader.rank === 2
                            ? "bg-gray-400 text-black"
                            : trader.rank === 3
                            ? "bg-orange-500 text-black"
                            : "bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-white"
                        }`}
                      >
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                          {trader.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold text-sm ${trader.color}`}
                          >
                            {trader.value}
                          </span>
                          <span className="text-gray-500 dark:text-slate-400 text-xs">
                            {trader.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity XP */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700/30">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                      Activity (XP)
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Monthly Points
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "Ryan Kim",
                      value: "9000 XP",
                      change: "(+500 XP)",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      rank: 2,
                      name: "Maya Patel",
                      value: "8000 XP",
                      change: "(+450 XP)",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      rank: 3,
                      name: "Jake Wilson",
                      value: "7000 XP",
                      change: "(+400 XP)",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      rank: 4,
                      name: "Zoe Chen",
                      value: "6000 XP",
                      change: "(+350 XP)",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      rank: 5,
                      name: "Alex Brown",
                      value: "5000 XP",
                      change: "(+300 XP)",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                  ].map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1
                            ? "bg-yellow-500 text-black"
                            : trader.rank === 2
                            ? "bg-gray-400 text-black"
                            : trader.rank === 3
                            ? "bg-orange-500 text-black"
                            : "bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-white"
                        }`}
                      >
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                          {trader.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold text-sm ${trader.color}`}
                          >
                            {trader.value}
                          </span>
                          <span className="text-gray-500 dark:text-slate-400 text-xs">
                            {trader.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sponsored */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700/30">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                      Sponsored
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Kor Coins
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "Kevin Lee",
                      value: "4500 coins",
                      change: "(++250)",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    {
                      rank: 2,
                      name: "Sophie Zhang",
                      value: "4000 coins",
                      change: "(++200)",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    {
                      rank: 3,
                      name: "Marcus Johnson",
                      value: "3500 coins",
                      change: "(++175)",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    {
                      rank: 4,
                      name: "Nina Rodriguez",
                      value: "3000 coins",
                      change: "(++150)",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    {
                      rank: 5,
                      name: "Oliver Kim",
                      value: "2500 coins",
                      change: "(++125)",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                  ].map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1
                            ? "bg-yellow-500 text-black"
                            : trader.rank === 2
                            ? "bg-gray-400 text-black"
                            : trader.rank === 3
                            ? "bg-orange-500 text-black"
                            : "bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-white"
                        }`}
                      >
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                          {trader.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold text-sm ${trader.color}`}
                          >
                            {trader.value}
                          </span>
                          <span className="text-gray-500 dark:text-slate-400 text-xs">
                            {trader.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Followed */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-slate-700/30">
                  <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                      Most Followed
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                      Social Ranking
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      name: "Isabella Garcia",
                      value: "9K followers",
                      change: "(++500)",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                    {
                      rank: 2,
                      name: "James Wilson",
                      value: "8K followers",
                      change: "(++450)",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                    {
                      rank: 3,
                      name: "Aria Patel",
                      value: "7K followers",
                      change: "(++400)",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                    {
                      rank: 4,
                      name: "Lucas Chen",
                      value: "6K followers",
                      change: "(++350)",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                    {
                      rank: 5,
                      name: "Mia Thompson",
                      value: "5K followers",
                      change: "(++300)",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                  ].map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1
                            ? "bg-yellow-500 text-black"
                            : trader.rank === 2
                            ? "bg-gray-400 text-black"
                            : trader.rank === 3
                            ? "bg-orange-500 text-black"
                            : "bg-gray-300 dark:bg-slate-600 text-gray-700 dark:text-white"
                        }`}
                      >
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium text-sm truncate">
                          {trader.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-semibold text-sm ${trader.color}`}
                          >
                            {trader.value}
                          </span>
                          <span className="text-gray-500 dark:text-slate-400 text-xs">
                            {trader.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boards Section */}
      <section className="py-16 sm:py-24 md:py-32 relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 px-4 py-1.5 text-sm">
              Community Boards
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trading Community
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              Join our vibrant community of traders and share your insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Free Board */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 border-gray-200 p-6 shadow-lg hover:shadow-green-300/50 transition-shadow duration-300 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:shadow-green-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Free Board
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-200 text-green-800 border border-green-300 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/25"
                  >
                    Public
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div
                      key={post}
                      className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:border-gray-700/50"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Post Title {post}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm truncate mb-2">
                        This is a small description for post {post} on the Free
                        Board.
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-gray-300 dark:border-gray-700" />
                          <p className="font-medium text-gray-800 dark:text-white text-sm">
                            Trader {post}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Education Board */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 border-gray-200 p-6 shadow-lg hover:shadow-blue-300/50 transition-shadow duration-300 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:shadow-blue-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Education Board
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-blue-200 text-blue-800 border border-blue-300 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/25"
                  >
                    Learning
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div
                      key={post}
                      className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:border-gray-700/50"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Post Title {post}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm truncate mb-2">
                        This is a small description for post {post} on the
                        Education Board.
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-gray-300 dark:border-gray-700" />
                          <p className="font-medium text-gray-800 dark:text-white text-sm">
                            Expert {post}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Profit Board */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/60 border-gray-200 p-6 shadow-lg hover:shadow-purple-300/50 transition-shadow duration-300 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:shadow-purple-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profit Board
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-purple-200 text-purple-800 border border-purple-300 dark:bg-purple-500/15 dark:text-purple-400 dark:border-purple-500/25"
                  >
                    Success
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div
                      key={post}
                      className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:border-gray-700/50"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Post Title {post}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm truncate mb-2">
                        This is a small description for post {post} on the
                        Profit Board.
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-gray-300 dark:border-gray-700" />
                          <p className="font-medium text-gray-800 dark:text-white text-sm">
                            Pro Trader {post}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-black dark:to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 px-4 py-1.5 text-sm">
              Start Your Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Master Trading?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Join thousands of traders who are already learning and earning
              through our simulation platform.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700 dark:text-white px-8 py-6 text-lg rounded-xl"
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
