import Link from "next/link";

export default function Pagination({
  currentPage,
  pageCount,
  path,
}: {
  currentPage: number;
  pageCount: number;
  path: string;
}) {
  return (
    <div className="join flex justify-center my-8">
      {Array.from({ length: pageCount }, (_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`${path}?page=${page}`}
            className={`join-item px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-primary text-white" : "bg-base-200"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
