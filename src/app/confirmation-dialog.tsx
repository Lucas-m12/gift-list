"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "lucide-react"
import { useState } from "react"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (name: string) => void
  selectedItems: string[]
}

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, selectedItems }: ConfirmationDialogProps) => {
  const [name, setName] = useState("")

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name.trim())
      setName("")
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText('82999270214');
    navigator.vibrate(200);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirme sua seleção de produto</DialogTitle>
          <p>
            Caso você tenha escolhido presentear em dinheiro, pode nos entregar em espécie ou fazer um pix para: (82) 99927-0214 
            <Button className="cursor-pointer w-6 h-6 ml-1" variant="link" onClick={handleCopy}>
              <CopyIcon width={24} height={24} />
            </Button>
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">Presentes selecionados:</Label>
            <ul className="col-span-3 list-disc pl-5">
              {selectedItems.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!name.trim()}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

