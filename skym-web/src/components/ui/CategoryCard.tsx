import { Category } from "@/lib/types";
import Link from "next/link";

export const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={{
      pathname: `/blog/category/${category.id}`,
      query: { title: `${category.title}` },
    }}
    className="card bg-base-100 shadow hover:shadow-lg p-4"
  >
    <div className="text-lg font-bold">{category.title}</div>
  </Link>
);
