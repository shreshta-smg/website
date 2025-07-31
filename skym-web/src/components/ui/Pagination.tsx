// components/PaginationControls.tsx
"use client"; // This is a client component

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationControls({
  totalPages,
  currentPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (page: number) => {
    router.push(`/?${createQueryString("page", String(page))}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          ««
        </button>
        <button
          className="join-item btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </button>

        {/* Dynamic page buttons (simplified for brevity) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`join-item btn ${currentPage === pageNumber ? "btn-active" : "btn-primary"}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          className="join-item btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </button>
        <button
          className="join-item btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          »»
        </button>
      </div>
    </div>
  );
}
