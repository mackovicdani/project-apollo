import { useState } from "react";

function Pagination(
  total: number,
  perPage: number,
  currentPage: number,
  setCurrentPage: (page: number) => void
) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i);
  }

  return (
    <div className="mt-3 flex h-6 w-full justify-center gap-1">
      {pages.map((page, index) => {
        return (
          <button
            className={`${
              currentPage === page ? "bg-secondary" : "bg-main"
            } aspect-square h-full rounded-md border border-border  text-xs font-bold text-text`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default function usePagination(array: any[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const slicedArray = array.slice(firstIndex, lastIndex);
  return {
    slicedArray,
    Pagination: Pagination(array.length, 5, currentPage, setCurrentPage),
  };
}
