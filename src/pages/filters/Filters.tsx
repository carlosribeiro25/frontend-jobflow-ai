import { useFilterContext } from '@/modules/auth/context/filter-context-base'
import { FilterFormField } from '@/@/components/Vagas/FilterFormFields'
import { Card, CardContent, CardHeader } from '@/@/components/ui/card'
import { CardVagas } from '@/@/components/Vagas/CardVagas'
import PaginationVagas from '@/@/components/layout/Pagination'
import CircularProgress from '@mui/material/CircularProgress'

const Filters = () => {
  const { data, isLoading, isError, hasFilters, hasMore, totalPages, page, handlePageChange } =
    useFilterContext()

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-14 md:mb-0">
      <div className="hidden md:block shrink-0">
        <Card className="w-70">
          <CardHeader className="">Buscar vagas por filtros</CardHeader>
          <CardContent>
            <FilterFormField />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 ">
        {isLoading && <CircularProgress />}
        {isError && <p>Erro ao buscar vagas com o filtro aplicado</p>}

        {!isLoading && !isError && hasFilters && data?.vagas.length === 0 && (
          <p>Nenhuma vaga encontrada com os filtros selecionados.</p>
        )}

        {data?.vagas && data.vagas.length > 0 && (
          <div>
            <p className="mb-2">{data.total} Vaga(s) encontrada(s)</p>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.vagas.map((vaga) => (
                <CardVagas key={vaga.id} vaga={vaga} />
              ))}
            </section>
            <PaginationVagas
              page={page}
              hasMore={hasMore}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isloading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Filters
