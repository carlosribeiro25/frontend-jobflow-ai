import { createContext, useContext } from 'react'
import type React from 'react'
import type { FiltersVagasResponse } from '@/types/filters-vagas'

export type FilterForm = {
  category: string
  modality: string
  location: string
  tipo_vaga: string
  publisheAt: string
}

export interface FilterContextType {
  form: FilterForm
  setForm: React.Dispatch<React.SetStateAction<FilterForm>>
  page: number
  data: FiltersVagasResponse | undefined
  isLoading: boolean
  isError: boolean
  hasMore: boolean
  totalPages: number
  hasFilters: boolean
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  handleClear: () => void
  handlePageChange: (newPage: number) => void
}

export const FilterContext = createContext<FilterContextType | null>(null)

export function useFilterContext() {
  const context = useContext(FilterContext)
  if (!context) throw new Error('useFilterContext must be used within FilterProvider')
  return context
}
