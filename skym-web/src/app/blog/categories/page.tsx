import { getPaginatedCategories } from "@/lib/server"; // Adjust path as needed
import PaginationControls from "@/components/ui/Pagination"; // Adjust path as needed
import Link from "next/link"; // For linking to category slug
// Define a type for your categories from database.types.ts for client-side use
interface Category {
  id: number;
  title: string;
  slug: string;
}

// Set a dynamic segment option for Next.js to handle search params
export const dynamic = "force-dynamic"; // Ensures this page is rendered dynamically on each request

interface CategoriesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

export default async function CategoriesPage(props: CategoriesPageProps) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = parseInt(searchParams.pageSize || "6", 10);

  const {
    data: categories,
    totalCount,
    error,
  } = await getPaginatedCategories({
    page: currentPage,
    pageSize: itemsPerPage,
    sortBy: "id", // Example sort for categories
    sortOrder: "asc", // Example sort
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
          <span>Error loading categories: {error.message}</span>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary sm:text-4xl">
        Explore Categories
      </h1>

      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map(
            (
              category: Category, // Cast to Category type
            ) => (
              <div
                key={category.slug}
                className="card bg-base-100 shadow-xl border border-base-200"
              >
                <div className="card-body items-center text-center p-6">
                  <h2 className="card-title text-xl font-semibold text-secondary mb-2">
                    {category.title}
                  </h2>
                  <p className="text-gray-500 text-sm italic mb-4">
                    {category.slug}
                  </p>
                  <div className="card-actions justify-center w-full mt-4">
                    <Link
                      href={`/blog/categories/${category.slug}/articles`}
                      className="btn btn-primary btn-block sm:btn-md sm:w-auto"
                    >
                      View articles in {category.title}
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500 py-10">
          No categories found.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
