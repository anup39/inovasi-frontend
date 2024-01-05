import { useState } from "react";

function Pagination({ changeThePage, totalpage }) {
  // const totalpage = totalpage;
  const pagesToShow = 3;
  const [activePage, setActivePage] = useState(0);

  // @ts-ignore
  const handlePageClick = (page) => {
    setActivePage(page);
    console.log(page);
    changeThePage(page - 1);
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
    <div className="p-[6px] middle:gap-[10px] flex scale-75 md:scale-100 items-center justify-center gap-2 rounded-[10px] border bg-pageBorder bg-opacity-20 middle:w-[350px] middle:h-[52px] middle:text-[14px] middle:leading-[20px] middle:font-[500] border-pageBorder">
      <button
        disabled={activePage === 1}
        onClick={() => handlePageClick(activePage - 1)}
      >
        <span className="hidden md:inline p-[10px]">Prev</span>
        <span className="md:hidden">{"<"}</span>
      </button>
      {window.innerWidth < 768 ? (
        <button
          className={`hover:bg-boxDivider px-3 py-1 rounded-[7px] ${
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
              className={`hover:bg-boxDivider px-3 py-1 middle:w-[40px] middle:h-[38px] middle:py-[5px] middle:px-[7px] rounded-[7px] ${
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
            className={`hover:bg-boxDivider middle:w-[40px] middle:h-[38px] middle:py-[5px] middle:px-[7px] px-3 py-1 rounded-[7px] ${
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
        <span className="hidden md:inline p-[10px]">Next</span>
        <span className="md:hidden">{">"}</span>
      </button>
    </div>
  );
}

export default Pagination;
