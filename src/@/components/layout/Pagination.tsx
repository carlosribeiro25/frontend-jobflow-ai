import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

interface PaginationProps {
  page: number
  hasMore: boolean
  onPageChange: (page: number) => void
  isloading: boolean
  totalPages: number
}

export default function PaginationVagas({
  page,
  hasMore,
  onPageChange,
  isloading,
  totalPages,
}: PaginationProps) {
  return (
    <div className="w-full mt-2 flex justify-center rounded items-center lg:col-span-2 gap-2">
      <div>
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1 || isloading}>
          <ArrowCircleLeftIcon />
        </button>
      </div>

      <span>
        Paginas {page} de {totalPages ?? '?'}
      </span>

      <div>
        <button onClick={() => onPageChange(page + 1)} disabled={!hasMore || isloading}>
          <ArrowCircleRightIcon />
        </button>
      </div>
    </div>
  )
}
