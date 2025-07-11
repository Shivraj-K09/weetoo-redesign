"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface PostPreviewProps {
  title: string;
  content: string;
  tags: string[];
  images: string[];
  carouselIndex: number;
  setCarouselIndex: (index: number) => void;
}

export function PostPreview({
  title,
  content,
  tags,
  images,
  carouselIndex,
  setCarouselIndex,
}: PostPreviewProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Always show first image by default when images change
  useEffect(() => {
    setCarouselIndex(0);
  }, [images, setCarouselIndex]);

  // Scroll carousel to correct index when carouselIndex or images change
  useEffect(() => {
    if (carouselApi && typeof carouselApi.scrollTo === "function") {
      carouselApi.scrollTo(carouselIndex);
    }
  }, [carouselApi, carouselIndex, images]);

  // Carousel thumbnail click
  const handleThumbnailClick = (idx: number) => {
    setCarouselIndex(idx);
  };

  // Mock user data for preview
  const user = {
    fullName: "Jane Doe",
    nickname: "janedoe",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    isVerified: true,
  };
  const views = 0;
  const time = "just now";

  return (
    <div className="w-full md:w-1/2 flex flex-col bg-card border border-border rounded-2xl shadow-2xl p-8 mx-auto md:mx-0 justify-start overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="flex flex-col w-full mx-auto min-h-[500px] rounded-2xl shadow-lg gap-1">
        {/* Title */}
        {title && (
          <>
            <h3 className="text-3xl font-extrabold text-foreground leading-tight mb-3">
              {title}
            </h3>
            {/* User Info Bar (below title) */}
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                  <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-foreground truncate max-w-[90px]">
                    {user.fullName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[70px]">
                    @{user.nickname}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 whitespace-nowrap"
                >
                  Follow
                </Button>
              </div>
              {/* Details: views, time */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {views} views
                </span>
                <span>•</span>
                <span>{time}</span>
              </div>
            </div>
          </>
        )}
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-accent text-accent-foreground px-3 py-1 text-xs font-medium rounded-full shadow border border-accent/40"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {/* Images Carousel */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className="relative w-full">
              <Carousel
                opts={{ loop: true }}
                className="w-full"
                orientation="horizontal"
                setApi={setCarouselApi}
              >
                <CarouselContent>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <img
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className="aspect-video w-full object-cover rounded-xl border border-border"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <div className="absolute top-1/2 left-6 -translate-y-1/2 z-10">
                      <CarouselPrevious />
                    </div>
                    <div className="absolute top-1/2 right-6 -translate-y-1/2 z-10">
                      <CarouselNext />
                    </div>
                  </>
                )}
              </Carousel>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-2 justify-center">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-12 h-12 object-cover rounded-md border-2 cursor-pointer transition-all ${
                      carouselIndex === idx
                        ? "border-primary scale-105"
                        : "border-border opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => handleThumbnailClick(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {/* Content */}
        {content && (
          <div className="prose prose-neutral dark:prose-invert max-w-full text-base mt-2 break-words whitespace-pre-wrap overflow-y-auto h-[250px] scrollbar-hide">
            {content.split("\n").map((line, idx) => (
              <p key={idx} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
          </div>
        )}
        {!title && !tags.length && !content && images.length === 0 && (
          <div className="text-muted-foreground text-left opacity-70 select-none">
            Start creating your post to see a live preview here.
          </div>
        )}
      </div>
    </div>
  );
}
