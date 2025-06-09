// schemas/requerimentoSchema.ts
import { z } from 'zod'

export const requerimentoSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    nomeSocial: z.string().optional(),
    matricula: z.string().min(1, 'Matrícula é obrigatória'),
    telefone: z.string().min(1, 'Telefone é obrigatório'),
    email: z.string().email('E-mail inválido'),
    cursoTurma: z.string().min(1, 'Curso/Turma é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    objetos: z.array(z.string()).min(1, 'Selecione pelo menos um objeto de requerimento'),
    outros: z.string().optional(),
    motivo: z.string().min(1, 'Exposição de motivos é obrigatória'),
})

export type Requerimento = z.infer<typeof requerimentoSchema>
