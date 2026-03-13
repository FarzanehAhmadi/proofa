import { sanityClient, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

// Page receives a promise for params
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  // 🔹 unwrap the promise
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await sanityClient.fetch(
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

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).url()
    : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <div className="mt-3 text-sm text-muted-foreground">
        {post.author?.name} •{" "}
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={post.title} className="mt-8 rounded-lg" />
      )}

      <div className="prose mt-10">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
