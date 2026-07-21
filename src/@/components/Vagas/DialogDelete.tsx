import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import DeleteIcon from '@mui/icons-material/Delete'

interface DialogProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  isPending: boolean
  onConfirm: () => void
}

export function DeleteDialog({ open, onOpen, onClose, isPending, onConfirm }: DialogProps) {
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose()
        }}
      >
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={onOpen}>
            <DeleteIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm text-amber-300">Deletar Vaga</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja deletar esta vaga? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Cancelar
            </Button>

            <Button onClick={onConfirm} type="submit" variant="destructive" disabled={isPending}>
              {isPending ? 'Deletando' : 'Deletar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
