import { Input } from '../ui/input'
import SearchIcon from '@mui/icons-material/Search'

type SearchVagasProps = {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export function SearchVagas({ value, onChange, onSearch }: SearchVagasProps) {
  return (
    <div>
      <form
        className="relative w-full max-w-102.5"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
        }}
      >
        <Input
          className="pr-10"
          type="search"
          placeholder="Buscar vagas"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="absolute right-1 top-1 text-muted-foreground hover:text-foreground "
          type="submit"
        >
          <SearchIcon fontSize="small" />
        </button>
      </form>
    </div>
  )
}
