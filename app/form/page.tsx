'use client'

import { requerimentoSchema } from '@/schemas/requerimentoSchema'
import { useState } from 'react'

export default function FormPage() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        nome: '',
        nomeSocial: '',
        matricula: '',
        telefone: '',
        email: '',
        cursoTurma: '',
        cpf: '',
        objetos: [] as string[],
        outros: '',
        motivo: '',
    })

    const objetosRequerimento = [
        { id: 'aproveitamento_estudos', label: 'Aproveitamento de Estudos' },
        { id: 'aproveitamento_experiencias', label: 'Aproveitamento de Experiências Anteriores' },
        { id: 'atestado_conclusao', label: 'Atestado de Conclusão' },
        { id: 'atestado_matricula', label: 'Atestado de Matrícula' },
        { id: 'atividade_domiciliar', label: 'Atividade Domiciliar' },
        { id: 'certificacao_enem', label: 'Certificação ENEM/ENCCEJA' },
        { id: 'historico_escolar', label: 'Histórico Escolar' },
        { id: 'contestacao_resultados', label: 'Contestação de Resultados' },
        { id: 'atestado_frequencia', label: 'Atestado de Frequência' },
        { id: 'diploma', label: 'Diploma' },
        { id: 'dispensa_ed_fisica', label: 'Dispensa de Educação Física' },
        { id: 'guia_transferencia', label: 'Guia de Transferência' },
        { id: 'justificativa_faltas', label: 'Justificativa de Faltas' },
        { id: 'reintegracao_curso', label: 'Reintegração de Curso' },
        { id: 'trancamento_matricula', label: 'Trancamento de Matrícula' },
        { id: 'transferencia_turno', label: 'Transferência de Turno' },
        { id: 'transferencia_outro_campus', label: 'Transferência para outro campus do IFBA' },
        { id: 'segunda_chamada', label: '2ª Chamada de Avaliação' },
        { id: 'cancelamento_matricula', label: 'Cancelamento de Matrícula' },
        { id: 'certificado_medio', label: 'Certificado do Ensino Médio' },
        { id: 'transferencia_interna', label: 'Transferência Interna' },
        { id: 'transferencia_externa', label: 'Transferência Externa' }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: '' })) // limpa erro ao digitar
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        setFormData(prev => ({
            ...prev,
            objetos: checked
                ? [...prev.objetos, value]
                : prev.objetos.filter(obj => obj !== value),
        }))
        setErrors(prev => ({ ...prev, objetos: '' }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = requerimentoSchema.safeParse(formData)

        if (!result.success) {
            const fieldErrors: Record<string, string> = {}
            result.error.errors.forEach(err => {
                const key = err.path[0] as string
                fieldErrors[key] = err.message
            })
            setErrors(fieldErrors)
            return
        }

        alert('Formulário enviado com sucesso (simulado)!')
        console.log('Dados validados:', result.data)

        await fetch('/api/requerimento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-8 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-bold mb-6 text-start">Solicitar Requerimento</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input name="nome" placeholder="Nome do Requerente" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.nome && <p className="text-red-600 text-sm">{errors.nome}</p>}
                    </div>
                    <div>
                        <input name="nomeSocial" placeholder="Nome Social" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                    </div>
                    <div>
                        <input name="matricula" placeholder="Matrícula" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.matricula && <p className="text-red-600 text-sm">{errors.matricula}</p>}
                    </div>
                    <div>
                        <input name="cpf" placeholder="CPF" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.cpf && <p className="text-red-600 text-sm">{errors.cpf}</p>}
                    </div>
                    <div>
                        <input name="telefone" placeholder="Telefone" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.telefone && <p className="text-red-600 text-sm">{errors.telefone}</p>}
                    </div>
                    <div>
                        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <input name="cursoTurma" placeholder="Curso/Turma" onChange={handleChange} className="p-2 border border-gray-400 rounded-lg w-full" />
                        {errors.cursoTurma && <p className="text-red-600 text-sm">{errors.cursoTurma}</p>}
                    </div>
                </div>

                <fieldset className="border border-gray-400 rounded-lg p-4">
                    <legend className="font-semibold mb-2">Objeto de Requerimento</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {objetosRequerimento.map((item) => (
                            <label key={item.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={formData.objetos.includes(item.id)}
                                    onChange={handleCheckbox}
                                />
                                {item.label}
                            </label>
                        ))}
                        <input
                            name="outros"
                            placeholder="Outros (especificar)"
                            onChange={handleChange}
                            className="col-span-2 p-2 border border-gray-400 rounded-lg"
                        />
                    </div>
                    {errors.objetos && <p className="text-red-600 text-sm mt-2">{errors.objetos}</p>}
                </fieldset>

                <div>
                    <label className="block font-semibold mb-1">Exposição de Motivos</label>
                    <textarea
                        name="motivo"
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-400 rounded-lg p-2"
                        placeholder="Descreva os motivos do requerimento"
                    />
                    {errors.motivo && <p className="text-red-600 text-sm">{errors.motivo}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Enviar Requerimento
                </button>
            </form>
        </main>
    )
}
