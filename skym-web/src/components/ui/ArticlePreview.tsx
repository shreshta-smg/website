import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ArticleProps {
  title?: string;
  slug?: string;
  content?: string; // markdown
  featured_image_url?: string;
  caption?: string;
  tags?: { title: string; slug: string }[];
  categoryId?: string;
}

export default function ArticlePreview({
  title,
  slug,
  content,
  featured_image_url,
  caption,
  tags,
  categoryId,
}: ArticleProps) {
  return (
    <div className="card shadow-md hover:shadow-lg p-4">
      <div className="relative w-full h-[400px] mb-4">
        {featured_image_url != undefined ? (
          <Image
            src={featured_image_url}
            alt={caption || "featured image"}
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <div className="skeleton w-full h-[400px] mb-4 rounded-md" />
        )}
      </div>

      <div>
        <Link href={`/blog/categories/${categoryId}/articles/${slug}`}>
          <h3 className="text-xl font-semibold hover:text-primary cursor-pointer mb-2">
            {title}
          </h3>
        </Link>

        <div className="prose prose-sm text-base-content max-w-none">
          <ReactMarkdown>{content?.replace(/\\n/g, "\n")}</ReactMarkdown>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags?.map((tag: { title: string; slug: string }) => (
            <span key={tag.slug} className="badge badge-outline badge-info">
              {tag.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
