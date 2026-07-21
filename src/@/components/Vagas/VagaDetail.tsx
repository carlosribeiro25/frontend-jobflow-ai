import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Vaga } from '@/types/vaga'
import { getVagasId } from '@/routes/routesApi/GetVagaById'
import { Spinner } from '../ui/spinner'
import { Card, CardContent } from '../ui/card'
import { DeleteDialog } from './DialogDelete'
import { deleteVagaByID } from '@/routes/routesApi/delete-vagas'
import { useToast } from '@/modules/auth/hooks/useToast'
import { ToastContainer } from '../ui/toast-container'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from '@/modules/auth/hooks/use-permition'

export function PageDetailVaga() {
  const { toasts, addToast, removeToast } = useToast()
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [confirmOpen, setConfirOpen] = useState(false)
  const [deleteVaga, setDeleteVagas] = useState<number | null>(null)
  const [vaga, setVaga] = useState<Vaga | null>(null)
  const [loading, setLoading] = useState<boolean>(Boolean(id))
  const [error, setError] = useState<boolean>(false)
  const navigate = useNavigate()

  const { isManager } = usePermissions()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteVagaByID(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vagas'] })
      setConfirOpen(false)
      addToast({
        message: 'Vaga deletada com sucesso',
        type: 'success',
        duration: 3000,
      })
      setTimeout(() => navigate('/vagas-filtros'), 3000)
    },
    onError: () => {
      addToast({
        message: 'Erro ao deletar vaga',
        type: 'error',
        duration: 3000,
      })
    },
  })

  const handleDelete = (id: number) => {
    setDeleteVagas(id)
    setConfirOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(deleteVaga as number)
  }

  useEffect(() => {
    async function loadVaga(id?: number) {
      if (id == null || Number.isNaN(id)) {
        setError(true)
        setLoading(false)
        return
      }
      try {
        const data = await getVagasId(id)
        setVaga(data)
      } catch (err) {
        console.error('Erro ao buscar Vaga:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (!id) {
      return
    }

    loadVaga(Number(id))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner className="size-6" />
        <span>Carregando vaga...</span>
      </div>
    )
  }

  if (error) {
    return <span>Erro ao carregar vaga</span>
  }

  if (!vaga) {
    return <span>Vaga nao encontrada</span>
  }

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {loading && (
        <div className="flex items-center gap-2">
          <Spinner className="size-6" />
          <span>Carregando vaga...</span>
        </div>
      )}

      <div className="w-full md:w-md lg:w-md gap-4  lg:p-2 ">
        <Card>
          <CardContent>
            <div className="flex justify-between ">
              <h1 className="text-emerald-300">{vaga.title}</h1>

              {isManager && (
                <DeleteDialog
                  open={confirmOpen}
                  onOpen={() => handleDelete(vaga.id)}
                  onClose={() => setConfirOpen(false)}
                  onConfirm={handleConfirmDelete}
                  isPending={deleteMutation.isPending}
                />
              )}
            </div>
            <p>{vaga.description}</p>
            <p>Vaga do tipo {vaga.tipo_vaga}</p>
            <p>Categoria {vaga.category}</p>
            <p>Empresa: {vaga.company}</p>
            <p>Requisitos {vaga.requirements}</p>
            <p>Salario {vaga.salary}</p>
            <p>Beneficios: {vaga.benefits}</p>
            <p> {vaga.contact}</p>
            <p>Local {vaga.location}</p>

            {vaga.link && (
              <a
                href={vaga.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Ver vaga
              </a>
            )}
            <p className="font-semibold">{vaga.modality}</p>

            <p className="font-semibold">
              Publicado em {''}
              {vaga.publisheAt &&
                new Date(vaga.publisheAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
            </p>
          </CardContent>
        </Card>

        {error && <span> Erro...</span>}
      </div>
    </div>
  )
}
