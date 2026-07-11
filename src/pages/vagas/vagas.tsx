import type { RegisterVagaPayload } from '@/types/create-vagas'
import type { RegisterVagaResponse } from '@/types/create-vagas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { registerVaga } from '@/routes/routesApi/register-vaga'
import { AxiosError } from 'axios'
import { ToastContainer } from '@/@/components/ui/toast-container'
import { useToast } from '@/modules/auth/hooks/useToast'
import { Card, CardContent, CardHeader, CardTitle } from '@/@/components/ui/card'
import { Label } from '@/@/components/ui/label'
import { Input } from '@/@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/@/components/ui/select'
import {
  tipoVagas,
  modality,
  tiposCategorias,
  type ModalityItem,
  type TipoCategotiasItem,
  type TipoVagasItem,
} from '@/@/components/config/itensSelectVaga'
import { Textarea } from '@/@/components/ui/textarea'
import { Field, FieldLabel } from '@/@/components/ui/field'
import { Button } from '@/@/components/ui/button'

export function RegisterVaga() {
  const queryClient = useQueryClient()
  const { toasts, removeToast, addToast } = useToast()
  const modalityOptions = modality.filter((item): item is ModalityItem => item.value !== null)
  const categoryOptions = tiposCategorias.filter(
    (item): item is TipoCategotiasItem => item.value !== null
  )
  const typeVagaOptions = tipoVagas.filter((item): item is TipoVagasItem => item.value !== null)
  const [salaryValue, setSalaryValue] = useState<number | undefined>()
  const [salaryInput, setSalaryInput] = useState('')
  const salaryDigitsRef = useRef('')

  const [form, setForm] = useState<RegisterVagaPayload>({
    title: '',
    tipo_vaga: '',
    description: '',
    category: '',
    company: '',
    requirements: '',
    modality: null,
    salary: null,
    benefits: '',
    contact: '',
    link: '',
    location: '',
  })

  const mutation = useMutation({
    mutationFn: registerVaga,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vagas'],
      })
      setForm({
        title: '',
        message: '',
        tipo_vaga: '',
        description: '',
        category: '',
        company: '',
        requirements: '',
        modality: null,
        salary: null,
        benefits: '',
        contact: '',
        link: '',
        location: '',
      })
      setSalaryValue(undefined)
      setSalaryInput('')
      salaryDigitsRef.current = ''
      addToast({
        type: 'success',
        message: data.message || 'Vaga cadastrada com sucesso 🎉🎉',
        duration: 3000,
      })
    },
    onError: (error: unknown) => {
      const apiError =
        error instanceof AxiosError ? (error as AxiosError<RegisterVagaResponse>) : null

      if (apiError?.response?.status === 400) {
        addToast({
          message: 'Erro ao cadastrar vaga',
          type: 'error',
          duration: 3000,
        })
      }
      return
    },
  })

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutation.mutate({
      title: form.title,
      tipo_vaga: form.tipo_vaga,
      description: form.description,
      category: form.category,
      company: form.company,
      requirements: form.requirements,
      modality: form.modality,
      salary: salaryValue ?? null,
      benefits: form.benefits,
      contact: form.contact,
      link: form.link,
      location: form.location,
    })
  }

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return ''
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = (e.nativeEvent as InputEvent).inputType
    const insertedData = (e.nativeEvent as InputEvent).data

    const nextDigits = (() => {
      if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
        return salaryDigitsRef.current.slice(0, -1)
      }

      if (inputType === 'insertText' && insertedData && /\d/.test(insertedData)) {
        return `${salaryDigitsRef.current}${insertedData}`
      }

      if (inputType === 'insertFromPaste' || inputType === 'insertReplacementText') {
        return e.target.value.replace(/\D/g, '')
      }

      if (inputType === 'deleteByCut' || e.target.value === '') {
        return ''
      }

      return e.target.value.replace(/\D/g, '')
    })()

    salaryDigitsRef.current = nextDigits

    if (nextDigits === '') {
      setSalaryValue(undefined)
      setSalaryInput('')
      return
    }

    const numericValue = Number(nextDigits)
    setSalaryValue(numericValue)
    setSalaryInput(formatCurrency(numericValue))
  }

  const resetForm = () => {
    setForm({
      title: '',
      message: '',
      tipo_vaga: '',
      description: '',
      category: '',
      company: '',
      requirements: '',
      modality: null,
      salary: null,
      benefits: '',
      contact: '',
      link: '',
      location: '',
    })
  }

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Card className='lg:w-2xl h-70 overflow-auto'>
        <CardHeader>
          <CardTitle>Cadastre uma nova vaga</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}>
            <Label htmlFor="title">Titulo</Label>
            <Input
              required
              className='mt-2'
              id="title"
              type="text"
              value={form.title}
              placeholder="Titulo da vaga..."
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <div className='grid grid-cols-2 justify-between sm:grid-cols-2 lg:grid-cols-3 mt-2'>
              <div className="flex">
                <Label htmlFor="tipo_vaga">Tipo: </Label>
                <Select
                  required
                  value={form.tipo_vaga || undefined}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, tipo_vaga: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selecione o tipo da vaga</SelectLabel>
                      {typeVagaOptions.map((item) => (
                        <SelectItem
                          key={item.value ?? 'Nao informado'}
                          value={item.value ?? 'Nao informado'}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <span>Modalidade:</span>
                <Select
                  required
                  value={form.modality ?? undefined}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      modality: value as RegisterVagaPayload['modality'],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {modalityOptions.map((item) => (
                        <SelectItem
                          key={item.value ?? 'Nao informado'}
                          value={item.value ?? 'Nao informado'}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex mt-2 md:mt-2 lg:mt-0">
                <Label htmlFor="category">Área: </Label>
                <Select
                  required
                  value={form.category || undefined}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selecione a área de atuação</SelectLabel>
                      {categoryOptions.map((item) => (
                        <SelectItem
                          key={item.value ?? 'Nao informado'}
                          value={item.value ?? 'Nao informado'}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className='mt-2'>
              <Label htmlFor="description">Descrição:</Label>
              <Input
                className='mt-2'
                id="description"
                name="description"
                type="text"
                value={form.description}
                placeholder="Descrição opcional..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className='mt-2'>
              <Field>
                <FieldLabel htmlFor="requirements">Requisitos: </FieldLabel>
                <Textarea
                  value={form.requirements}
                  id="requirements"
                  name="requirements"
                  placeholder="Requisitos da vaga"
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  required
                />
              </Field>
            </div>

            <div className='mt-2'>
              <Label htmlFor="benefits">Beneficios:</Label>
              <Input
                className='mt-2'
                id="benefits"
                name="benefits"
                type="text"
                value={form.benefits}
                placeholder="Beneficios garantidos..."
                onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                required
              />
            </div>

            <div className='mt-2'>
              <Label htmlFor="contact">Contato:</Label>
              <Input
                className='mt-2'
                id="contact"
                name="contact"
                type="text"
                value={form.contact}
                placeholder="Email ou telefone de contato"
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
              />
            </div>

            <div className='mt-2'>
              <Label htmlFor="location">Local da vaga :</Label>
              <Input
                className='mt-2'
                id="location"
                name="location"
                type="text"
                value={form.location}
                placeholder="Localização"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>

            <div className='mt-2'>
              <Label htmlFor="link">URL da vaga :</Label>
              <Input
                className='mt-2'
                id="link"
                name="link"
                type="text"
                value={form.link}
                placeholder="Url de acesso a vaga(opcional)"
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>

            <div className='mt-2'>
              <Label htmlFor="company">Empresa :</Label>
              <Input
                className='mt-2'
                id="company"
                name="company"
                type="text"
                value={form.company}
                placeholder="Informe o nome da empresa"
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
              />
            </div>

            <div className='mt-2'>
              <Label htmlFor="salary">Salário:</Label>
              <Input
                className='mt-2'
                id="salary"
                name="salary"
                type="text"
                inputMode="numeric"
                value={salaryInput}
                onChange={handleSalaryChange}
                required
              />
            </div>
            <div className='mt-2 flex justify-center gap-2'>
              <Button className='hover:bg-green-800 hover:text-amber-50' type="submit">Enviar Cadastro</Button>
              <Button type='button' className='hover:bg-red-400 hover:text-amber-50' onClick={resetForm}>Desfazer Alterações</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
