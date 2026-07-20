import React, { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { FilteredVagas } from '@/routes/routesApi/filter-vagas'
import { fetchVagas } from '@/routes/routesApi/Vagas'
import type { FilteredVagasPayload } from '@/types/filters-vagas'
import type { Modality } from '@/types/vaga'
import { FilterContext } from './filter-context-base'
import type { FilterForm } from './filter-context-base'

const pageSize = 6

const emptyForm: FilterForm = {
  category: '',
  modality: '',
  location: '',
  tipo_vaga: '',
  publisheAt: '',
}

const MODALITY_VALUES: Modality[] = ['Remoto', 'Hibrido', 'Presencial', 'Home Office']

const isModality = (value: string): value is Modality => MODALITY_VALUES.includes(value as Modality)

const toPayload = (filter: FilterForm, page: number): FilteredVagasPayload => ({
  category: filter.category || null,
  modality: filter.modality ? (isModality(filter.modality) ? filter.modality : null) : null,
  location: filter.location || null,
  tipo_vaga: filter.tipo_vaga || null,
  publisheAt: filter.publisheAt || null,
  page,
})

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<FilterForm>(emptyForm)
  const [applied, setApplied] = useState<FilterForm>(emptyForm)
  const [page, setPage] = useState(1)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const payload = toPayload(applied, page)

  const hasFilters =
    !!applied.category ||
    !!applied.modality ||
    !!applied.location ||
    !!applied.tipo_vaga ||
    !!applied.publisheAt

  const { data: defaultData, isLoading: defaultIsLoading } = useQuery({
    queryKey: ['vagas', 'default', page],
    queryFn: () => fetchVagas('', page, pageSize),
    enabled: !hasFilters,
    placeholderData: keepPreviousData,
  })

  const {
    data: filteredData,
    isLoading: filteredIsLoading,
    isError,
  } = useQuery({
    queryKey: ['vagas', 'filter', payload, page],
    queryFn: () => FilteredVagas(payload),
    enabled: hasFilters,
    placeholderData: keepPreviousData,
    retry: false,
  })

  const data = hasFilters ? filteredData : defaultData
  const isLoading = hasFilters ? filteredIsLoading : defaultIsLoading

  const hasMore = data?.hasMore ?? false

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
    setApplied({ ...form })
    setIsSheetOpen(false)
  }

  const handleClear = () => {
    setForm(emptyForm)
    setApplied(emptyForm)
    setPage(1)
  }

  return (
    <FilterContext.Provider
      value={{
        form,
        setForm,
        page,
        data,
        isLoading,
        isError,
        hasMore,
        totalPages,
        hasFilters,
        isSheetOpen,
        setIsSheetOpen,
        handleSubmit,
        handleClear,
        handlePageChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
