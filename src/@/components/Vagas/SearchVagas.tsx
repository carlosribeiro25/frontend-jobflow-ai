import { useState } from 'react'
import { useSearchVagas } from '@/modules/auth/hooks/use-search-vagas'
import { Input } from '../ui/input'
import SearchIcon from '@mui/icons-material/Search';

const LIMIT = 10

export function SearchVagas() {
  const [input, setInput] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } = useSearchVagas(
    termoBuscado,
    page,
    LIMIT,
  )

  const vagas = data?.vagas ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / LIMIT)

  function handleBuscar() {
    setPage(1)
    setTermoBuscado(input.trim())
  }

  return (
    <div className=' '>
      <form
        className='relative w-full max-w[420px'
         onSubmit={(e) => {
          e.preventDefault()
          handleBuscar()
        }}>

        <Input
          className='pr-10'
          type="search"
          placeholder="Buscar vagas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='absolute right-1 top-1 text-muted-foreground hover:text-foreground ' 
        type='submit'>
          <SearchIcon fontSize='small' />
          
        </button>

      </form>







      {/* Estados de UI */}
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Erro ao buscar vagas. Tente novamente.</p>}
      {!isLoading && termoBuscado && vagas.length === 0 && (
        <p>Nenhuma vaga encontrada para "{termoBuscado}".</p>
      )}

      {/* isFetching: revalidando em background (com dados antigos na tela) */}
      {isFetching && !isLoading && <span>Atualizando...</span>}

      <ul>
        {vagas.map((vaga) => (
          <li key={vaga.id}>
            <h3>{vaga.title}</h3>
            <p>{vaga.company} · {vaga.modality} · {vaga.location}</p>
            <p>{vaga.description}</p>
            {vaga.salary && <strong>R$ {vaga.salary}</strong>}
          </li>
        ))}
      </ul>

      {/* Paginação usando o `total` do backend */}
      {totalPages > 1 && (
        <div>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Anterior
          </button>
          <span>Página {page} de {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}