import "../../css/homepage/Pagination.css";

interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="flex items-center justify-center my-5">
      <div className="flex items-center justify-center gap-2">
        {totalPages <= 10 ? (
          pageNumbers.map((pageNumber) => (
            <button className="individualPages" key={pageNumber}>
              {pageNumber}
            </button>
          ))
        ) : (
          <div className="flex items-center justify-center gap-2">
            <button className="individualPages">{"<"}</button>
            {/* First page number */}
            {pageNumbers.slice(0, 1).map((pageNumber) => (
              <button className="individualPages" key={pageNumber}>
                {pageNumber}
              </button>
            ))}
            <div className="opacity-[0.3]">•••</div>
            {/* first two middle pages */}
            {pageNumbers.slice(4, 6).map((pageNumber) => (
              <button className="individualPages" key={pageNumber}>
                {pageNumber}
              </button>
            ))}
            {/* center of the middle page to style it */}
            {pageNumbers.slice(6, 7).map((pageNumber) => (
              <button
                className="individualPages bg-black text-white"
                key={pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            {/* last two of the middle page */}
            {pageNumbers.slice(7, 9).map((pageNumber) => (
              <button className="individualPages" key={pageNumber}>
                {pageNumber}
              </button>
            ))}

            <div className="opacity-[0.3]">•••</div>
            {/* Last page number */}
            {pageNumbers.slice(-1).map((pageNumber) => (
              <button className="individualPages" key={pageNumber}>
                {pageNumber}
              </button>
            ))}
            <button className="individualPages">{">"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Pagination;
