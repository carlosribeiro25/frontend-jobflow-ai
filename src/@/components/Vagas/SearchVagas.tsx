import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchVagas } from '@/services/Vagas'
import { Input } from '../ui/input'
import SearchIcon from '@mui/icons-material/Search'

type SearchVagasProps = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export function SearchVagas({ value, onChange, onSearch }: SearchVagasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['vagas', 'sugestions', value],
    queryFn: () => searchVagas(value, 1),
    enabled: value.trim().length > 1,
  })

  useEffect(() => {
    function handleClickOut(e: MouseEvent) {
      if (containRef.current && !containRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOut)
    return () => document.removeEventListener('mousedown', handleClickOut)
  }, [])

  const sugestions = data?.vagas ?? []

  return (
    <div ref={containRef} className="relative w-full max-w-102.5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
          setIsOpen(false)
        }}
      >
        <Input
          className="pr-10 "
          type="text"
          placeholder="Buscar vagas"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />

        <button
          className="absolute right-1 top-1 text-muted-foreground hover:text-foreground "
          type="submit"
        >
          <SearchIcon fontSize="small" />
        </button>
      </form>

      {isOpen && sugestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-popover border rounded-md shadow-md z-50 overflow-hidden">
          {sugestions.map((vaga) => (
            <li key={vaga.id}
            className='cursor-pointer p-2'
              onClick={() => {
                navigate(`vagas/${vaga.id}`)
                setIsOpen(false)
              }}>
              <span className='font-medium'>{vaga.title}</span>
              {vaga.tipo_vaga && (
                <span> - {vaga.tipo_vaga}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
