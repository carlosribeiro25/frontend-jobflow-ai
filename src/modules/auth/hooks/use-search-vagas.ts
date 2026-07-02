import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { searchVagas } from '@/@/components/Vagas/Vagas-Search'

export function useSearchVagas(q: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['search-vagas', q, page, limit],
    queryFn: () => searchVagas({ q, page, limit }),
    enabled: q.trim().length >= 1,
    placeholderData: keepPreviousData,
  })
}
