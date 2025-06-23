"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const images = [
  "https://plus.unsplash.com/premium_photo-1673468922221-4cae4d1aa748?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=2070&auto=format&fit=crop",
];

export function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0"
          alt="Login background"
        />
      </AnimatePresence>
    </div>
  );
}
