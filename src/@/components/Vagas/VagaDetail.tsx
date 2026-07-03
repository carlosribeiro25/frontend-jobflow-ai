import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vaga } from "@/types/vaga";
import { getVagasId } from "./GetVagaById";
import { Spinner } from "../ui/spinner";
import { Card, CardContent } from "../ui/card";



export function PageDetailVaga() {
    const { id } = useParams<{ id: string }>()

    const [vaga, setVaga] = useState<Vaga | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        async function loadVaga(id?: number) {
            if (id == null || Number.isNaN(id)) {
                console.warn('loadVaga called without valid id')
                setLoading(false)
                return
            }
            try {
                const data = await getVagasId(id);
                setVaga(data)
            } catch (err) {
                console.error("Erro ao buscar Vaga:", err);
                setError(true)
            } finally {
                setLoading(false)
            }
        }


        if (!id) {
            setLoading(false)
            return
        }

        loadVaga(Number(id));
    }, [id])

    if (!vaga) {
        return <span>Vaga nao encontrada</span>
    }

    return (
        <div>
            {loading && (
                <div className="flex items-center gap-2">
                    <Spinner className="size-6" />
                    <span>Carregando vaga...</span>
                </div>
            )}

            <div className="w-full gap-4  lg:p-2 ">
                <Card>
                    <CardContent>
                        <h1 className="text-emerald-300">{vaga.title}</h1>
                        <p>{vaga.description}</p>
                        <p>Vaga do tipo {vaga.tipo_vaga}</p>
                        <p>Categoria {vaga.category}</p>
                        <p>Empresa: {vaga.company}</p>
                        <p className=" rounded p-2">Requisitos {vaga.requirements}</p>
                        <p>Salario {vaga.salary}</p>
                        <p>Beneficios: {vaga.benefits}</p>
                        <p> {vaga.contact}</p>
                        <p>Local {vaga.location}</p>

                        {vaga.link && (
                            <a
                                href={vaga.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Ver vaga
                            </a>
                        )}
                        <p className="font-semibold">{vaga.modality}</p>

                        <p className="font-semibold">
                            Publicado em {''}
                            {vaga.publisheAt &&
                                new Date(vaga.publisheAt).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                        </p>
                    </CardContent>
                </Card>

                {error && (
                    <span> Erro...</span>
                )}

            </div>
        </div>
    )
}
