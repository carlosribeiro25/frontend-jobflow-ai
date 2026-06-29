import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { Card, CardContent } from '../ui/card'
import PaginationVagas from '../layout/Pagination'
import { useState } from 'react'

const LIMIT = 12

interface Vaga {
  id: number
  title: string
  description: string
  tipo_vaga: string
  category: string
  company: string
  requirements: string
  salary: string
  benefits: string
  contact: string
  location: string
  link: string
  modality: string
  publisheAt: string
}

interface VagasResponse {
  vagas: Vaga[]
  totalPages?: number
  total?: number
}

const getVagas = async (page: number) => {
  const { data } = await api.get<VagasResponse>('/vagas', {
    params: { page, limit: LIMIT },
  })
  return data
}

export function ListVagas() {
  const [page, setPage] = useState(1)

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['vagas', page],
    queryFn: () => getVagas(page),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  })

  if (isPending) {
    return <span>Carregando...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const isLoading = isPending || isFetching
  const totalPages = data?.totalPages ?? (data?.total ? Math.ceil(data.total / LIMIT) : 1)
  const hasMore = page < totalPages

  return (
    <div className="space-y-4 grid lg:grid-cols-3 md:grid-cols-2 w-full justify-center gap-2  lg:p-2 ">
      {data?.vagas.map((vaga) => (
        <Card key={vaga.id}>
          <CardContent className="space-y-2 ">
            <h1 className="text-emerald-300">{vaga.title}</h1>
            <p>{vaga.description}</p>
            <p>Vaga do tipo {vaga.tipo_vaga}</p>
            <p>Categoria {vaga.category}</p>
            <p>Empresa: {vaga.company}</p>
            <p className="bg-amber-200 rounded p-2">Requisitos {vaga.requirements}</p>
            <p className="text-red-500">Salario {vaga.salary}</p>
            <p className="text-cyan-700">Beneficios: {vaga.benefits}</p>
            <p>Contato {vaga.contact}</p>
            <p>Local {vaga.location}</p>
            <a
              href={vaga.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Ver vaga
            </a>
            <p className="font-semibold bg-blue-300">Modalidade: {vaga.modality}</p>
            <p className="font-semibold">
              Publicado em {''}
              {new Date(vaga.publisheAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </CardContent>
        </Card>
      ))}
      <div className="lg:col-span-3  md:col-span-2 w-full flex justify-center">
        <PaginationVagas
          page={page}
          hasMore={hasMore}
          totalPages={totalPages}
          onPageChange={setPage}
          isloading={isLoading}
        />
      </div>
    </div>
  )
}
