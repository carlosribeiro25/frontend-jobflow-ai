import { useQuery } from "@tanstack/react-query"
import { api } from "@/services/api"
import { Card, CardContent } from "../ui/card"

export function ListVagas() {
    const { isPending, isError, data, error} = useQuery({
        queryKey: ['vagas'],
        queryFn: async () => {
            const response = await api.get('/vagas')
            return await response.data
        }
        
    })
    console.log(data)

    if( isPending) {
        return <span>Carregando...</span>
    }

    if(isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="space-y-4 grid lg:grid-cols-2 gap-2 lg:p-2 ">
            {data?.vagas.map((vaga: any) => (
            <Card key={vaga.id}>
                <CardContent className="space-y-2 p-4" >
                    <h1 className="text-emerald-300">{vaga.title}</h1>
                    <p>{vaga.description}</p>
                    <p>Vaga do tipo {vaga.tipo_vaga}</p>
                    <p>Categoria {vaga.category}</p>
                    <p>Empresa: {vaga.company}</p>
                    <p className="bg-amber-200 rounded p-2">Requisitos {vaga.requirements}</p>
                    <p className="text-red-500">Salario {vaga.salary}</p>
                    <p className="text-cyan-700">Beneficios:  {vaga.benefits}</p>
                    <p>Contato {vaga.contact}</p>
                    <p>Local  {vaga.location}</p>
                    <a href={vaga.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline">Ver vaga</a>
                    <p className="font-semibold bg-blue-300">Modalidade: {vaga.modality}</p>
                    <p className="font-semibold">Publicado em {""}
                        {new Date(vaga.publisheAt).toLocaleDateString("pt-BR", {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}</p>

                </CardContent>
            </Card>
            ))}
        </div>
    )
}