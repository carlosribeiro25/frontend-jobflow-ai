import PaginationVagas from '@/@/components/layout/Pagination'
import { ListVagas } from '@/@/components/Vagas/ListVagas'
import { useState } from 'react'
import { useVagas } from '@/modules/auth/hooks/useVagas'
import { useOutletContext } from 'react-router-dom'
import type { LayoutContext } from '@/types/layout-Context'

export default function HomePage() {
  const { search } = useOutletContext<LayoutContext>()
  const [{ page, term }, setQueryState] = useState({ page: 1, term: search })

  if (term !== search) {
    setQueryState({ page: 1, term: search })
  }

  const { data, isPending, isFetching, isError, totalPages, hasMore } = useVagas(page, term)

  const handlePageChange = (newPage: number) => {
    setQueryState((prev) => ({ ...prev, page: newPage }))
  }

  if (isError) {
    return <span>Erro ao carregar vagas</span>
  }

  const isLoading = isPending || isFetching

  return (
    <main className="">
      <h1>Pagina principal</h1>

      <ListVagas vagas={data?.vagas ?? []} />

      <div className="lg:col-span-3  md:col-span-2 w-full flex justify-center">
        <PaginationVagas
          page={page}
          hasMore={hasMore}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isloading={isLoading}
        />
      </div>
    </main>
  )
}
