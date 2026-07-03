import { Card, CardContent } from '../ui/card'
import type { Vaga } from '@/types/vaga'
import { useNavigate } from 'react-router-dom'
import PlaceIcon from '@mui/icons-material/Place'
import StoreIcon from '@mui/icons-material/Store'

type CardVagsProps = {
  vaga: Vaga
}

export function CardVagas({ vaga }: CardVagsProps) {
  const navigate = useNavigate()

  return (
    <Card key={vaga.id}>
      <CardContent className="space-y-2 ">
        <div className="flex justify-between mb-4">
          <h1 className="text-emerald-300">{vaga.title}</h1>
          <button
            className="cursor-pointer text-blue-500"
            onClick={() => navigate(`/vagas/${vaga.id}`)}
          >
            Detalhes
          </button>
        </div>

        <p>{vaga.message}</p>
        <p>Vaga do tipo {vaga.tipo_vaga}</p>
        <p>Categoria {vaga.category}</p>

        <div className="flex gap-2 items-center">
          <p>Empresa: {vaga.company}</p>
          <StoreIcon />
        </div>

        <div className="flex gap-2 items-center">
          <p>{vaga.location}</p>
          <PlaceIcon />
        </div>

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
        <p className="font-semibold bg-blue-300">Modalidade: {vaga.modality}</p>

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
  )
}
