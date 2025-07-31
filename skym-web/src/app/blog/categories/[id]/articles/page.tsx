// app/blog/articles/page.tsx (This is a Server Component)

import { getPaginatedArticles } from "@/lib/server"; // Import the function and Article type
import PaginationControls from "@/components/ui/Pagination"; // Adjust path as needed
import Link from "next/link"; // For linking to individual article pages
import Image from "next/image"; // For optimized images
import React from "react";

// Set a dynamic segment option for Next.js to handle search params
export const dynamic = "force-dynamic"; // Ensures this page is rendered dynamically on each request

interface ArticlesPageProps {
  params: {
    id: string; // The category ID from the URL, e.g., /blog/category/123/articles -> id = "123"
  };
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function ArticlesPage({
  params,
  searchParams,
}: ArticlesPageProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = parseInt(searchParams.pageSize || "9", 10); // Changed to 9 items per page (3x3 grid)

  const {
    data: articles,
    totalCount,
    error,
  } = await getPaginatedArticles({
    page: currentPage,
    pageSize: itemsPerPage,
    sortBy: "created_at",
    sortOrder: "desc",
    categoryId: params.id,
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading articles: {error.message}</span>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((totalCount || 0) / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-primary">
        Latest Articles
      </h1>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => (
            <div
              key={article.id} // Use database ID as key for mapping
              className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow duration-300"
            >
              {article.featured_image_url && (
                <figure className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={article.featured_image_url}
                    alt={article.title || "Featured image"}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-box"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </figure>
              )}
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-xl font-semibold text-secondary mb-2 line-clamp-2">
                  <Link
                    href={`/blog/categories/${params.id}/articles/${article.article_id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </h2>
                {article.caption && (
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">
                    {article.caption}
                  </p>
                )}
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>
                    Published:{" "}
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/blog/categories/${params.id}/articles/${article.article_id}`}
                    className="btn btn-primary btn-sm btn-block sm:btn-md sm:w-auto"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 py-10">
          No articles found.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
