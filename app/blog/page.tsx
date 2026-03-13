import { sanityClient } from "@/lib/sanity";
import Blog from "@/components/blog";

export default async function BlogPage() {
  const posts = await sanityClient.fetch(`
    *[_type == "post"]| order(publishedAt desc)[0...9]{
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      author->{name},
      categories[]-> {title}
    }
  `);

  return <Blog posts={posts} />;
}
