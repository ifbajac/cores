// app/api/requerimento/route.ts (ou route.js se não usar TypeScript)

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    const data = await req.json()

    const novoRequerimento = await prisma.requerimento.create({
        data: {
            nome: data.nome,
            nomeSocial: data.nomeSocial || null,
            matricula: data.matricula,
            telefone: data.telefone,
            email: data.email,
            cursoTurma: data.cursoTurma,
            cpf: data.cpf,
            objetos: data.objetos,
            outros: data.outros || null,
            motivo: data.motivo,
        },
    })

    return NextResponse.json(novoRequerimento)
}
