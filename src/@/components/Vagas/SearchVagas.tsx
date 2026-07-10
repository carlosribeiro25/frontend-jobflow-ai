import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSearchVagas } from '@/routes/routesApi/GetSeachVagas'
import { Input } from '../ui/input'
import SearchIcon from '@mui/icons-material/Search'

type SearchVagasProps = {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
}

export function SearchVagas({ value, onChange, onSearch }: SearchVagasProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['vagas', 'sugestions', value],
    queryFn: () => getSearchVagas(value, 1),
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

  function goToVaga(id: number) {
    navigate(`/vagas/${id}`)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || sugestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % sugestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + sugestions.length) % sugestions.length)
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault()
        goToVaga(sugestions[activeIndex].id)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div ref={containRef} className="relative w-full max-w-102.5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSearch(value.trim())
          setIsOpen(false)
        }}
      >
        <Input
          className="pr-10 py-4.5"
          type="search"
          placeholder="Buscar vagas"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setActiveIndex(-1)
            setIsOpen(true)
          }}
          onFocus={() => {
            setIsOpen(true)
            setActiveIndex(-1)
          }}
          onKeyDown={handleKeyDown}
        />

        <button
          className="absolute  border-l-2  h-full right-2 p-1 text-muted-foreground hover:text-foreground "
          type="submit"
        >
          <SearchIcon fontSize="small" />
        </button>
      </form>

      {isOpen && sugestions.length > 0 && (
        <div>
          <ul className="absolute top-full mt-1 w-full bg-popover border rounded-md shadow-md z-50 overflow-hidden">
            {sugestions.map((vaga, index) => (
              <li
                key={vaga.id}
                className={`px-3 py-2 cursor-pointer text-sm ${
                  index === activeIndex ? 'bg-accent' : 'hover:bg-accent'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goToVaga(vaga.id)}
              >
                <span className="font-medium">{vaga.title}</span>
                {vaga.tipo_vaga && <span> - {vaga.tipo_vaga}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
