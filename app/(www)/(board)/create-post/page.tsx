"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [, setImageFiles] = useState<File[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Always show first image by default when images change
  useEffect(() => {
    setCarouselIndex(0);
  }, [images]);

  // Scroll carousel to correct index when carouselIndex or images change
  useEffect(() => {
    if (carouselApi && typeof carouselApi.scrollTo === "function") {
      carouselApi.scrollTo(carouselIndex);
    }
  }, [carouselApi, carouselIndex, images]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files).slice(0, 4 - images.length);
    const readers = fileArr.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((base64s) => {
      setImages((prev) => [...prev, ...base64s].slice(0, 4));
      setImageFiles((prev) => [...prev, ...fileArr].slice(0, 4));
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove image
  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    if (carouselIndex >= images.length - 1 && carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  // Tag add/remove
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Carousel thumbnail click
  const handleThumbnailClick = (idx: number) => {
    setCarouselIndex(idx);
  };

  // Form actions (stub)
  const handlePublish = () => {
    // TODO: Implement publish logic
    alert("Published!");
  };
  const handleDraft = () => {
    // TODO: Implement save as draft logic
    alert("Saved as draft!");
  };
  const handleCancel = () => {
    // TODO: Implement cancel logic
    setTitle("");
    setTags([]);
    setTagInput("");
    setContent("");
    setImages([]);
    setImageFiles([]);
    setCarouselIndex(0);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row gap-2 container mx-auto py-10">
      {/* Form Card */}
      <div className="w-full md:w-1/2 flex flex-col bg-card border border-border rounded-2xl shadow-lg p-8 mx-auto md:mx-0">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Create a New Post
        </h2>
        {/* Title */}
        <div className="mb-6">
          <Label htmlFor="title" className="mb-2 text-muted-foreground">
            Post Title
          </Label>
          <Input
            id="title"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="text-base bg-muted/60 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 h-10"
          />
        </div>
        {/* Images */}
        <div className="mb-6">
          <Label className="mb-2 text-muted-foreground">
            Images <span className="font-normal text-xs">(up to 4)</span>
          </Label>
          <div className="flex gap-3 flex-wrap">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt={`Upload ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-border shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/40"
                  onClick={() => setCarouselIndex(idx)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 p-1 shadow opacity-80 hover:opacity-100"
                  onClick={() => handleRemoveImage(idx)}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {images.length < 4 && (
              <Label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-muted-foreground/40 rounded-lg cursor-pointer hover:border-primary/60 transition-colors bg-muted/40">
                <span className="text-muted-foreground text-2xl">+</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  aria-label="Add images"
                />
              </Label>
            )}
          </div>
        </div>
        {/* Tags */}
        <div className="mb-6">
          <Label className="mb-2 text-muted-foreground">Tags</Label>
          <Input
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="text-base bg-muted/60 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 h-10"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="pr-1.5 pl-3 py-1 text-xs flex items-center gap-1 bg-accent text-accent-foreground border border-accent/40"
              >
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none p-0 h-4 w-4"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="mb-8">
          <Label htmlFor="content" className="mb-2 text-muted-foreground">
            Content
          </Label>
          <Textarea
            id="content"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="h-48 resize-none rounded-lg border border-input bg-muted/60 p-3 text-base shadow-xs focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-full overflow-y-auto"
          />
        </div>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto justify-end">
          <Button
            type="button"
            onClick={handlePublish}
            className="font-semibold px-6 w-full sm:w-auto"
          >
            Publish
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleDraft}
            className="font-semibold px-6 w-full sm:w-auto"
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="font-semibold px-6 w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </div>
      {/* Preview Card */}
      <div className="w-full md:w-1/2 flex flex-col bg-card border border-border rounded-3xl shadow-2xl p-8 mx-auto md:mx-0 min-h-[650px] h-full justify-start overflow-y-auto overflow-x-hidden scrollbar-hide">
        <h2 className="text-2xl font-bold mb-1 text-muted-foreground">
          Preview
        </h2>
        <div className="flex flex-col w-full mx-auto min-h-[500px] bg-background rounded-2xl shadow-lg gap-1">
          {/* Title */}
          {title && (
            <h3 className="text-3xl font-extrabold text-foreground leading-tight mb-3">
              {title}
            </h3>
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
              <Carousel
                opts={{ loop: true }}
                className="w-full max-w-xl mx-auto"
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
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
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
            <div className="prose prose-neutral dark:prose-invert max-w-full text-base mt-2 break-words whitespace-pre-wrap">
              {content.split("\n").map((line, idx) => (
                <p key={idx} className="mb-2 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          )}
          {!title && !tags.length && !content && images.length === 0 && (
            <div className="text-muted-foreground text-center mt-12 opacity-70 select-none">
              Start creating your post to see a live preview here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
