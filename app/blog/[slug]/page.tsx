/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityClient, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import katex from "katex";
import "katex/dist/katex.min.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Category = {
  title: string;
};

type Post = {
  _id: string;
  title: string;
  mainImage?: any;
  publishedAt?: string;
  body: any;
  author?: { name?: string };
  categories?: Category[];
};

// Function to render LaTeX in text
function renderLatexInText(text: string) {
  if (!text) return text;

  // Handle display math \[ ... \]
  let processed = text.replace(/\\\[(.*?)\\\]/gs, (_, formula) => {
    return katex.renderToString(formula.trim(), {
      displayMode: true,
      throwOnError: false,
      output: "html",
    });
  });

  // Handle inline math $ ... $ (but not $$ which is display math)
  processed = processed.replace(/\$(.+?)\$/g, (_, formula) => {
    return katex.renderToString(formula, {
      displayMode: false,
      throwOnError: false,
      output: "html",
    });
  });

  // Handle display math $$ ... $$
  processed = processed.replace(/\$\$(.+?)\$\$/gs, (_, formula) => {
    return katex.renderToString(formula, {
      displayMode: true,
      throwOnError: false,
      output: "html",
    });
  });

  return processed;
}

// Custom serializer for text blocks
const components = {
  block: {
    normal: ({ children }: any) => {
      // Get the text content from children
      const text = children
        .map((child: any) => {
          if (typeof child === "string") return child;
          if (child?.props?.text) return child.props.text;
          return "";
        })
        .join("");

      // Process LaTeX in the text
      const processedHtml = renderLatexInText(text);

      // If there's LaTeX, use dangerouslySetInnerHTML
      if (processedHtml !== text) {
        return <p dangerouslySetInnerHTML={{ __html: processedHtml }} />;
      }

      // Otherwise render normally
      return <p>{children}</p>;
    },

    h1: ({ children }: any) => {
      const text = children.map((c: any) => c?.text || "").join("");
      const processedHtml = renderLatexInText(text);

      if (processedHtml !== text) {
        return (
          <h1
            className="text-3xl font-bold mt-8 mb-4"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      }
      return <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>;
    },

    h2: ({ children }: any) => {
      const text = children.map((c: any) => c?.text || "").join("");
      const processedHtml = renderLatexInText(text);

      if (processedHtml !== text) {
        return (
          <h2
            className="text-2xl font-bold mt-6 mb-3"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      }
      return <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>;
    },

    h3: ({ children }: any) => {
      const text = children.map((c: any) => c?.text || "").join("");
      const processedHtml = renderLatexInText(text);

      if (processedHtml !== text) {
        return (
          <h3
            className="text-xl font-bold mt-4 mb-2"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      }
      return <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>;
    },

    blockquote: ({ children }: any) => {
      const text = children.map((c: any) => c?.text || "").join("");
      const processedHtml = renderLatexInText(text);

      if (processedHtml !== text) {
        return (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic my-4"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      }
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      );
    },
  },

  types: {
    image: ({ value }: any) => (
      <img
        src={urlFor(value.asset).width(800).url()}
        alt={value.alt || "Blog image"}
        className="my-6 rounded-lg"
      />
    ),

    // Keep the separate LaTeX block for complex formulas
    latex: ({ value }: any) => (
      <div
        className="my-6 overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(value.formula, {
            displayMode: true,
            throwOnError: false,
            output: "html",
          }),
        }}
      />
    ),
  },

  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value.href} className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return notFound();

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

      <div className="prose mt-10 max-w-none">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}
