import { useQuery } from '@tanstack/react-query'
import { fetchVagas, searchVagas } from '@/services/Vagas'

const LIMIT = 12

export function useVagas(page: number, search: string) {
  const searching = search.trim().length > 0

  const query = useQuery({
    queryKey: searching ? ['vagas', 'search', search, page] : ['vagas', 'list', page],
    queryFn: () => (searching ? searchVagas(search, page) : fetchVagas('', page)),
    refetchOnWindowFocus: false,
    placeholderData: (previous) => previous,
  })

  const total = query.data?.total ?? 0

  const totalPages = Math.ceil(total / LIMIT)

  const hasMore = query.data?.hasMore ?? false

  return {
    ...query,
    total,
    totalPages,
    hasMore,
    limite: LIMIT,
  }
}
