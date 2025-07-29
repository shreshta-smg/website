import { CategoryCard } from "@/components/ui/CategoryCard";
import Pagination from "@/components/ui/Pagination";
import { getCategories } from "@/lib/external";
import { Category } from "@/lib/types";
interface Props {
  searchParams?: { page?: string };
}
export default async function category({ searchParams }: Props) {
  const page = parseInt(searchParams?.page || "1", 10);
  const { categories, pagination } = await getCategories(page);

  return (
    <section className="p-6">
      <div className="grid grid-cols-3 gap-8 p-8">
        {categories.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        pageCount={pagination?.pageCount || 1}
        path={`/blog/category`}
      />
    </section>
  );
}
