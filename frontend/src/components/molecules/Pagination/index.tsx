import { PaginationProps } from "@/interfaces/common";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Pagination = ({
  totalItems,
  itemsPerPage,
  setPage,
  page,
  maxButtonsToShow = 9,
}: PaginationProps) => {
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 0) {
    totalPages = 1;
  }

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [page]);

  const debounced = useDebouncedCallback((page: number) => {
    setPage(page);
  }, 1000);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      debounced(newPage);
    }
  };
  const generatePageNumbers = () => {
    console.log("currentPage", currentPage, totalPages);
    const middleButtonIndex = Math.floor(maxButtonsToShow / 2);
    let startPage: number;

    switch (true) {
      case totalPages <= maxButtonsToShow:
        startPage = 1;
        break;
      case currentPage <= middleButtonIndex + 1:
        startPage = 1;
        break;
      case currentPage >= totalPages - middleButtonIndex:
        startPage = totalPages - maxButtonsToShow + 1;
        break;
      default:
        startPage = currentPage - middleButtonIndex;
    }

    const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;
      return (
        <button
          key={pageNumber}
          className={`mx-[4px] h-[32px] w-[32] rounded-full p-[8px] outline-none flex items-center justify-center ${currentPage === pageNumber
            ? "border border-darkpurplecms bg-blue-500 text-gray-100"
            : "text-gray-800 hover:bg-lightpurple"
            }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          <div className="flex  h-[16px] w-[16px] items-center justify-center">
            {pageNumber}
          </div>
        </button>
      );
    });
  };

  return (
    <div className="mb-4 flex flex-wrap items-center justify-center">
      <button
        className={`bg-white shadow-md border-graybordercms mx-[12px] h-[32px] w-[32] rounded-full p-[8px] ${currentPage === 1
          ? "text-gray-800"
          : "border-[1px] border-graybordercms text-blue-500 hover:border-darkpurplecms hover:bg-lightpurple"
          }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <div className="flex h-[16px] w-[16px] items-center justify-center">
          <div>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528703 5.47139C0.403722 5.34637 0.333512 5.17683 0.333512 5.00006C0.333512 4.82328 0.403722 4.65374 0.528703 4.52872L4.30004 0.757389C4.36153 0.693716 4.4351 0.642927 4.51643 0.607988C4.59777 0.573049 4.68525 0.554658 4.77377 0.553889C4.86229 0.553119 4.95007 0.569987 5.032 0.603508C5.11394 0.637029 5.18837 0.686531 5.25097 0.749126C5.31356 0.811721 5.36306 0.886155 5.39658 0.968086C5.4301 1.05002 5.44697 1.1378 5.4462 1.22632C5.44543 1.31484 5.42704 1.40232 5.3921 1.48366C5.35716 1.56499 5.30638 1.63856 5.2427 1.70006L1.9427 5.00006L5.2427 8.30006C5.36414 8.42579 5.43134 8.59419 5.42982 8.76899C5.4283 8.94379 5.35819 9.111 5.23458 9.2346C5.11098 9.35821 4.94377 9.42832 4.76897 9.42984C4.59417 9.43136 4.42577 9.36416 4.30004 9.24272L0.528703 5.47139Z"
                fill={currentPage === 1 ? "#1f2937" : "#3b82f6"}
                fillOpacity={currentPage === 1 ? "0.4" : "1.0"}
              />
            </svg>
          </div>
        </div>
      </button>
      <div className="bg-white flex items-center justify-center p-2 rounded-full shadow-md">
        {generatePageNumbers()}
      </div>
      <button
        className={`bg-white shadow-md border-graybordercms mx-[12px] h-[32px] w-[32] rounded-full p-[8px] ${currentPage === totalPages
          ? "text-gray-800"
          : " text-blue-500 hover:border-darkpurplecms hover:bg-lightpurple"
          }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <div className="flex  h-[16px] w-[16px] items-center justify-center">
          <div>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47136 4.52861C5.59634 4.65363 5.66655 4.82317 5.66655 4.99994C5.66655 5.17672 5.59634 5.34626 5.47136 5.47128L1.70003 9.24261C1.63853 9.30628 1.56496 9.35707 1.48363 9.39201C1.40229 9.42695 1.31481 9.44534 1.22629 9.44611C1.13777 9.44688 1.04999 9.43001 0.968056 9.39649C0.886125 9.36297 0.81169 9.31347 0.749095 9.25087C0.6865 9.18828 0.636998 9.11384 0.603477 9.03191C0.569957 8.94998 0.553089 8.8622 0.553858 8.77368C0.554627 8.68516 0.573018 8.59768 0.607958 8.51634C0.642897 8.43501 0.693685 8.36144 0.757358 8.29994L4.05736 4.99994L0.757358 1.69994C0.635919 1.57421 0.568723 1.40581 0.570242 1.23101C0.571761 1.05621 0.641873 0.889004 0.765479 0.765398C0.889084 0.641792 1.05629 0.57168 1.23109 0.570161C1.40589 0.568642 1.57429 0.635838 1.70002 0.757276L5.47136 4.52861Z"
                fill={currentPage === totalPages ? "#1f2937" : "#3b82f6"}
                fillOpacity={currentPage === totalPages ? "0.4" : "1.0"}
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Pagination;
