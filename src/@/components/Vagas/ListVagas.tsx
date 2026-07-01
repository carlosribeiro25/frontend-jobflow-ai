import { CardVagas } from './CardVagas'
import type { Vaga } from '@/types/vaga'

type ListVagasProps = {
  vagas?: Vaga[]
}

export function ListVagas({ vagas }: ListVagasProps) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full gap-4  lg:p-2 ">
      {vagas?.map((vaga) => (
        <CardVagas key={vaga.id} vaga={vaga} />
      ))}
    </div>
  )
}
