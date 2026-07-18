import { useFilterContext } from '@/modules/auth/context/filter-context-base'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/@/components/ui/select'
import { Label } from '@/@/components/ui/label'
import { Calendar } from '@/@/components/ui/calendar'
import { Button } from '@/@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/@/components/ui/popover'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/@/lib/utils'
import {
  tipoVagas,
  modality,
  tiposCategorias,
  location,
} from '@/@/components/config/itensSelectVaga'

export function FilterFormField() {
  const { form, setForm, handleSubmit, handleClear } = useFilterContext()

  const modalityOptions = modality.filter(
    (item): item is { label: string; value: string } => item.value !== null
  )
  const categoryOptions = tiposCategorias.filter(
    (item): item is { label: string; value: string } => item.value !== null
  )
  const typeVagaOptions = tipoVagas.filter(
    (item): item is { label: string; value: string } => item.value !== null
  )
  const locationOptions = location.filter(
    (item): item is { label: string; value: string } => item.value !== null
  )

  return (
    <form className="-mt-7 lg:mt-0 " onSubmit={handleSubmit}>
      <div className="flex  mb-2  justify-between">
        <div className="">
          <Label htmlFor="tipo_vaga" className="lg:mb-1">
            Tipo:
          </Label>
          <Select
            value={form.tipo_vaga || ''}
            onValueChange={(value) => setForm((prev) => ({ ...prev, tipo_vaga: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecione o tipo da vaga</SelectLabel>
                {typeVagaOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="modality" className="lg:mb-1">
            Modalidade:
          </Label>
          <Select
            value={form.modality || ''}
            onValueChange={(value) => setForm((prev) => ({ ...prev, modality: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {modalityOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="category" className="lg:mb-1">
          Area:
        </Label>
        <Select
          value={form.category || ''}
          onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Area de atuacao" />
          </SelectTrigger>
          <SelectContent position="popper" align="start" className="w-full min-w-0 h-60">
            <SelectGroup>
              <SelectLabel>Selecione a area de atuacao</SelectLabel>
              {categoryOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <Label htmlFor="location" className="lg:mb-1">
          Localizacao:
        </Label>
        <Select
          value={form.location || ''}
          onValueChange={(value) => setForm((prev) => ({ ...prev, location: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma localização" />
          </SelectTrigger>
          <SelectContent position="popper" align="start" className="w-full min-w-0 h-60">
            <SelectGroup>
              <SelectLabel>Selecione uma localizacao</SelectLabel>
              {locationOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <Label className="mb-1">Data de publicacao:</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'justify-start text-left font-normal',
                !form.publisheAt && 'text-muted-foreground'
              )}
            >
              <CalendarMonthIcon className="mr-2 h-4 w-4" />
              {form.publisheAt
                ? format(new Date(form.publisheAt), 'dd/MM/yyyy', { locale: ptBR })
                : 'Escolha uma data'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={form.publisheAt ? new Date(form.publisheAt) : undefined}
              onSelect={(date) =>
                setForm((prev) => ({
                  ...prev,
                  publisheAt: date ? format(date, 'yyyy-MM-dd') : '',
                }))
              }
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 mt-2">
        <Button className="cursor-pointer" type="submit" variant="default">
          <span>Filtrar</span>
          <SearchIcon fontSize="small" className="mt-1" />
        </Button>
        <Button
          className="cursor-pointer  "
          variant="destructive"
          type="button"
          onClick={handleClear}
        >
          <span>Limpar filtros</span>
          <ClearIcon fontSize="small" />
        </Button>
      </div>
    </form>
  )
}
