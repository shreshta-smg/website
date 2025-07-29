import { Article } from "@/lib/types";
import Link from "next/link";
import { TagPill } from "./TagPill";

export const ArticleCard = ({ article }: { article: Article }) => (
  <Link
    href={`/blog/category/${article.categoryId}/article/${article.slug}`}
    className="card bg-base-100 shadow hover:shadow-lg p-4"
  >
    <div className="text-lg font-bold">
      <p>{article.title}</p>
      {article.tags.map((tag, idx) => (
        <TagPill key={idx} tag={tag} />
      ))}
    </div>
  </Link>
);
