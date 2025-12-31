import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'


interface CustomPagination {
    handlePageChange: (num: number) => void,
    currentPage: number,
    totalPages: number
}
const CustomPagination = ({ handlePageChange, currentPage, totalPages }: CustomPagination) => {
    return (
        <div>
            <Pagination className="mt-8 flex justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={currentPage === 1 ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                        />
                    </PaginationItem>
                    {(() => {
                        const pagesToShow: (number | string)[] = []
                        const maxVisible = 5
                        if (totalPages <= maxVisible) {
                            for (let i = 1; i <= totalPages; i++) pagesToShow.push(i)
                        } else {
                            pagesToShow.push(1)
                            if (currentPage > 3) pagesToShow.push("...")
                            const start = Math.max(2, currentPage - 1)
                            const end = Math.min(totalPages - 1, currentPage + 1)
                            for (let i = start; i <= end; i++) pagesToShow.push(i)
                            if (currentPage < totalPages - 2) pagesToShow.push("...")
                            pagesToShow.push(totalPages)
                        }
                        return pagesToShow.map((page, idx) => (
                            <PaginationItem key={idx}>
                                {page === "..." ? (
                                    <span className="px-2 text-gray-400">…</span>
                                ) : (
                                    <PaginationLink
                                        onClick={() => handlePageChange(Number(page))}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))
                    })()}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default CustomPagination