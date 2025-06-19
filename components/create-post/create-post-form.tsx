"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { ImageUploader } from "./image-uploader";
import { PostPreview } from "./post-preview";
import { RichTextEditor } from "./rich-text-editor";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [, setImageFiles] = useState<File[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  // Form actions
  const handlePublish = () => {
    // TODO: Implement publish logic
    alert("Published!");
  };

  const handleDraft = () => {
    // TODO: Implement save as draft logic
    alert("Saved as draft!");
  };

  const handleCancel = () => {
    setTitle("");
    setTags([]);
    setTagInput("");
    setContent("");
    setImages([]);
    setImageFiles([]);
    setCarouselIndex(0);
  };

  return (
    <>
      {/* Mobile: Tabs for Create and Preview */}
      <div className="block md:hidden w-full">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="w-full bg-transparent flex gap-1 mb-2">
            <TabsTrigger
              value="create"
              className="flex-1 rounded-lg py-2 px-2 text-base font-semibold data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Create
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex-1 rounded-lg py-2 px-2 text-base font-semibold data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="create"
            className="w-full min-h-[100dvh] flex flex-col pb-6 px-3"
          >
            <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl shadow-lg p-4 sm:p-6">
              {/* Title */}
              <div className="mb-4">
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
              <ImageUploader
                images={images}
                setImages={setImages}
                setImageFiles={setImageFiles}
                carouselIndex={carouselIndex}
                setCarouselIndex={setCarouselIndex}
              />
              {/* Tags */}
              <div className="mb-4">
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
              <div className="mb-6">
                <Label htmlFor="content" className="mb-2 text-muted-foreground">
                  Content
                </Label>
                <RichTextEditor onChange={setContent} />
              </div>
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
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
          </TabsContent>
          <TabsContent
            value="preview"
            className="w-full min-h-[100dvh] flex flex-col pt-6 pb-6 px-3"
          >
            <div className="flex-1 flex flex-col">
              <PostPreview
                title={title}
                content={content}
                tags={tags}
                images={images}
                carouselIndex={carouselIndex}
                setCarouselIndex={setCarouselIndex}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Desktop: Side-by-side layout */}
      <div className="hidden md:flex min-h-[calc(100vh-80px)] flex-row gap-2 container mx-auto py-10">
        {/* Form Card */}
        <div className="w-full md:w-1/2 flex flex-col bg-card border border-border rounded-2xl shadow-lg p-8 mx-auto md:mx-0">
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
          <ImageUploader
            images={images}
            setImages={setImages}
            setImageFiles={setImageFiles}
            carouselIndex={carouselIndex}
            setCarouselIndex={setCarouselIndex}
          />
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
            <RichTextEditor onChange={setContent} />
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
        {/* Preview */}
        <PostPreview
          title={title}
          content={content}
          tags={tags}
          images={images}
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
        />
      </div>
    </>
  );
}
