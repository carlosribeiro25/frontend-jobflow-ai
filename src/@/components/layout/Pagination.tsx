import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Button } from '../ui/button';

interface PaginationProps {
    page: number;
    hasMore: boolean;
    onPageChange: (page: number) => void;
    isloading: boolean;
    totalPages: number
}

export default function PaginationVagas({ page, hasMore, onPageChange, isloading, totalPages }: PaginationProps) {
    return (
        <div className='flex justify-center md:justify-center lg:justify-center bg-amber-400 m-auto items-center '>
            <div>
                <Button variant='ghost'
                
                 onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1 || isloading}>
                    <ArrowCircleLeftIcon />
                </Button>
            </div>

            <span>Paginas {page} de {totalPages ?? '?'}</span>

            <div>
                <Button variant='ghost'
                 onClick={() => onPageChange(page + 1)}
                    disabled={!hasMore || isloading}>
                    <ArrowCircleRightIcon/>
                </Button>
            </div>
        </div>

    )
}