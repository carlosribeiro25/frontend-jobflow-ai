import { useState } from 'react'
import { useVagas } from '@/modules/auth/hooks/useVagas'
import { useOutletContext } from 'react-router-dom'
import type { LayoutContext } from '@/types/layout-Context'
import Filters from './filters/Filters'

export default function HomePage() {
  const outletContext = useOutletContext<LayoutContext | null>()
  const search = outletContext?.search ?? ''
  const [{ page, term }, setQueryState] = useState({ page: 1, term: search })

  if (term !== search) {
    setQueryState({ page: 1, term: search })
  }

  const { isError } = useVagas(page, term)

  if (isError) {
    return <span>Erro ao carregar vagas</span>
  }

  return (
    <main>
      <Filters />
    </main>
  )
}
