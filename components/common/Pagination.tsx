type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPages = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  const baseBtn =
    'border-0 bg-transparent cursor-pointer text-[16px] font-medium text-[#616161] px-[10px] py-[6px] rounded-[6px] transition-all duration-200 ease-in-out';
  const activeBtn = '!bg-[#616161] text-white';
  const disabledBtn = 'disabled:text-[#ccc] disabled:cursor-not-allowed';

  return (
    <div className="mt-7.5 flex items-center justify-center gap-1.5">
      <button
        className={`${baseBtn} ${disabledBtn}`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
      >
        &lt; 이전
      </button>

      {pages[0] > 1 && (
        <>
          <button
            className={baseBtn}
            onClick={() => handleClick(1)}
            type="button"
          >
            1
          </button>
          {totalPages > 10 && <span className="px-1 text-[#888]">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`${baseBtn} ${page === currentPage ? activeBtn : ''}`}
          onClick={() => handleClick(page)}
          type="button"
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {totalPages > 10 && <span className="px-1 text-[#888]">...</span>}
          <button
            className={baseBtn}
            onClick={() => handleClick(totalPages)}
            type="button"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={`${baseBtn} ${disabledBtn}`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
      >
        다음 &gt;
      </button>
    </div>
  );
};

export default Pagination;
