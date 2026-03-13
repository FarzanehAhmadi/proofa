/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Dot, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { urlFor } from "@/lib/sanity";

type Category = {
  title: string;
};

type Author = {
  name: string;
};

type Post = {
  _id: string;
  title: string;
  slug?: { current: string };
  mainImage?: any;
  publishedAt?: string;
  author?: Author;
  categories?: Category[];
};

type BlogProps = {
  posts: Post[];
};

export default function Blog({ posts }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState(9);

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => {
      post.categories?.forEach((cat) => set.add(cat.title));
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((post) =>
      post.categories?.some((c) => c.title === selectedCategory),
    );
  }, [posts, selectedCategory]);

  // Limit visible posts for "Load More"
  const postsToShow = filteredPosts.slice(0, visiblePosts);

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-16 xl:px-0">
      {/* Header */}
      <div className="flex items-end justify-between">
        <h2 className="font-semibold text-3xl tracking-tight">Blog</h2>

        <Select
          defaultValue="all"
          onValueChange={(value) => {
            setSelectedCategory(value);
            setVisiblePosts(9);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts grid */}
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {postsToShow.map((post) => {
          const imageUrl = post.mainImage
            ? urlFor(post.mainImage).width(800).url()
            : null;

          return (
            <Link
              key={post._id}
              href={post.slug?.current ? `/blog/${post.slug.current}` : "#"}
              className="block"
            >
              <Card className="overflow-hidden rounded-md py-0 shadow-none hover:shadow-md transition h-full flex flex-col">
                {/* Image */}
                <CardHeader className="p-0">
                  <div
                    className="aspect-video w-full border-b bg-muted"
                    style={{
                      backgroundImage: imageUrl
                        ? `url(${imageUrl})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </CardHeader>

                {/* Content */}
                <CardContent className="pb-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-semibold text-xl tracking-tight line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Categories / tags */}
                  <div className="mt-4 flex flex-wrap gap-2 max-h-12 overflow-hidden">
                    {post.categories?.map((cat) => (
                      <Badge
                        key={cat.title}
                        className="bg-primary/10 text-primary"
                      >
                        {cat.title}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata pinned to bottom */}
                  <div className="mt-auto flex items-center gap-2 text-muted-foreground text-sm">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-GB",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                    )}

                    <Dot />

                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {post.author?.name || "Unknown"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Load more button */}
      {visiblePosts < filteredPosts.length && (
        <div className="flex justify-center mt-12">
          <Button size="lg" onClick={() => setVisiblePosts((prev) => prev + 6)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
