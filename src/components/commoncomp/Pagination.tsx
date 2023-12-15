import { useState } from "react";

function Pagination() {
  const totalpage = 10;
  const pagesToShow = 3;
  const [activePage, setActivePage] = useState(1);

  // @ts-ignore
  const handlePageClick = (page) => {
    setActivePage(page);
    // Add any additional logic you need when a page is clicked
  };

  const calculatePageRange = () => {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = activePage - halfPagesToShow;
    let endPage = activePage + halfPagesToShow;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(pagesToShow, totalpage);
    }

    if (endPage > totalpage) {
      endPage = totalpage;
      startPage = Math.max(1, totalpage - pagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="px-3 py-2 flex scale-75 md:scale-100 items-center justify-center gap-2 rounded-xl border border-pageBorder">
      <button
        disabled={activePage === 1}
        onClick={() => handlePageClick(activePage - 1)}
      >
        <span className="hidden md:inline">Prev</span>
        <span className="md:hidden">{"<"}</span>
      </button>
      {window.innerWidth < 768 ? (
        <button
          className={`hover:bg-boxDivider px-3 py-1 rounded-md ${
            activePage === activePage
              ? "bg-gradient-to-r from-footerHeading to-parrot text-white"
              : ""
          }`}
          key={activePage}
          onClick={() => handlePageClick(activePage)}
        >
          {activePage}
        </button>
      ) : (
        <>
          {calculatePageRange().map((page) => (
            <button
              className={`hover:bg-boxDivider px-3 py-1 rounded-md ${
                activePage === page
                  ? "bg-gradient-to-r from-footerHeading to-parrot text-white"
                  : ""
              }`}
              key={page}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
          <span>•••</span>
          <button
            className={`hover:bg-boxDivider px-3 py-1 rounded-md ${
              activePage === totalpage
                ? "bg-gradient-to-r from-footerHeading to-parrot text-white"
                : ""
            }`}
            key={totalpage}
            onClick={() => handlePageClick(totalpage)}
          >
            {totalpage}
          </button>
        </>
      )}
      <button
        disabled={activePage === totalpage}
        onClick={() => handlePageClick(activePage + 1)}
      >
        <span className="hidden md:inline">Next</span>
        <span className="md:hidden">{">"}</span>
      </button>
    </div>
  );
}

export default Pagination;
