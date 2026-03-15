/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityClient, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

// Props for dynamic route
type PageProps = {
  params: Promise<{ slug: string }>;
};

// Category type
type Category = {
  title: string;
};

// Blog post type
type Post = {
  _id: string;
  title: string;
  mainImage?: any;
  publishedAt?: string;
  body: any;
  author?: { name?: string };
  categories?: Category[];
};

/**
 * PortableText components for rendering:
 * - Images using Next.js Image
 * - LaTeX formulas
 */
const components = {
  types: {
    image: ({ value }: any) => {
      const src = urlFor(value.asset).width(800).url();
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={value.alt || "Blog image"}
            width={800}
            height={500} // approximate height, will scale automatically
            className="rounded-lg object-cover"
          />
        </div>
      );
    },

    latex: ({ value }: any) => (
      <div
        className="my-6 text-center"
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(value.formula, {
            displayMode: true,
            throwOnError: false,
          }),
        }}
      />
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  // Unwrap the promise for dynamic route params
  const { slug } = await params;

  if (!slug) return notFound();

  // Fetch post from Sanity by slug
  const post: Post = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      mainImage,
      publishedAt,
      body,
      author->{name},
      categories[]->{title}
    }`,
    { slug },
  );

  if (!post) return notFound();

  // Optional hero image for the post
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Post title */}
      <h1 className="text-4xl font-bold">{post.title}</h1>

      {/* Author and published date */}
      <div className="mt-3 text-sm text-muted-foreground">
        {post.author?.name} •{" "}
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </div>

      {/* Hero image */}
      {imageUrl && (
        <div className="mt-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* Body content */}
      <div className="prose mt-10">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}
