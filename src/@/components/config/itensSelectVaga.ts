export type ModalityItem = {
  label: string
  value: string | null
}

export type TipoVagasItem = {
  label: string
  value: string | null
}

export type TipoCategotiasItem = {
  label: string
  value: string | null
}

export const tipoVagas = [
  { label: 'Selecione', value: null },
  { label: 'CLT', value: 'CLT' },
  { label: 'Emprego', value: 'Emprego' },
  { label: 'Estágio', value: 'Estagio' },
  { label: 'Especialista', value: 'Especialista' },
]

export const tiposCategorias = [
  { label: 'Selecione', value: null },
  { label: 'Administração', value: 'Administracao' },
  { label: 'Comercial', value: 'Comercial' },
  { label: 'Contabilidade', value: 'Contabilidade' },
  { label: 'Dev de software', value: 'Desenvolvimento de software' },
  { label: 'Design', value: 'Design' },
  { label: 'Direito', value: 'Direito' },
  { label: 'Educação', value: 'Educacao' },
  { label: 'Engenharia', value: 'Engenharia' },
  { label: 'Financeiro', value: 'Financeiro' },
  { label: 'Gestão de projetos', value: 'Gestão de projetos' },
  { label: 'Logística', value: 'Logistica' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Qualidade de software', value: 'Qualidade de software' },
  { label: 'Recursos Humanos', value: 'Recursos Humanos' },
  { label: 'Saúde', value: 'Saúde' },
  { label: 'Serviços gerais', value: 'Servicos gerais' },
  { label: 'Tecnologia', value: 'Tecnologia' },
  { label: 'Vendas', value: 'Vendas' },
]
// .enum(['Remoto', 'Hibrido', 'Presencial', 'Home Office'])
export const modality = [
  { label: 'Selecione', value: null },
  { label: 'Home Office', value: 'Home Office' },
  { label: 'Remoto', value: 'Remoto' },
  { label: 'Hibrido', value: 'Hibrido' },
  { label: 'Presencial', value: 'Presencial' },
]
