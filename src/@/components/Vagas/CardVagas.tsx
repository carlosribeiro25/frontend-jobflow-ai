import { Card, CardContent } from '../ui/card'
import type { Vaga } from '@/types/vaga'

type CardVagsProps = {
  vaga: Vaga
}

export function CardVagas({ vaga }: CardVagsProps) {
  return (
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
