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

export type LocationItems = {
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
  { label: 'Administração', value: 'Administração' },
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

export const modality = [
  { label: 'Selecione', value: null },
  { label: 'Home Office', value: 'Home Office' },
  { label: 'Remoto', value: 'Remoto' },
  { label: 'Hibrido', value: 'Hibrido' },
  { label: 'Presencial', value: 'Presencial' },
]

export const location = [
  { label: 'Selecione', value: null },
  { label: 'Cambeba Fortaleza-CE', value: 'Cambeba' },
  { label: 'Caucaia Fortaleza-CE', value: 'Caucaia' },
  { label: 'Centro Fortaleza-CE', value: 'Centro' },
  { label: 'Cidade dos Funcionários Fortaleza-CE', value: 'Cidade dos Funcionários' },
  { label: 'Dionísio Torres Fortaleza-CE', value: 'Dionísio Torres' },
  { label: 'Edson Queiroz Fortaleza-CE', value: 'Edson Queiroz' },
  { label: 'Fortaleza-CE', value: 'Fortaleza-CE' },
  { label: 'Messejana-CE', value: 'Messejana' },
  { label: 'Mucuripe Fortaleza-CE', value: 'Mucuripe' },
  { label: 'São Paulo-SP', value: 'São Paulo' },
]
