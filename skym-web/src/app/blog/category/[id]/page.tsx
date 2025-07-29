// app/blog/category/[id]/page.tsx

import Pagination from "@/components/ui/Pagination";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Article } from "@/lib/types";
import { getArticles } from "@/lib/external";
import { headers } from "next/headers";

interface Props {
  params: { id: string };
  searchParams?: { page?: string; title?: string };
}

export default async function ArtileList({ params }: Props) {
  const searchParams = new URLSearchParams(
    (await headers()).get("x-next-url")?.split("?")[1],
  );
  const page = searchParams.get("page") || "1";
  const categoryId = params.id;
  const categoryTitle = searchParams.get("title") || "";

  const { articles, pagination } = await getArticles(categoryId, page);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Category: {categoryTitle}</h1>

      <div className="grid grid-cols-3 gap-8 p-8">
        {articles.map((post: Article) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        pageCount={pagination?.pageCount || 1}
        path={`/blog/category/${categoryId}/article`}
      />
    </section>
  );
}
