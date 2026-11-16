'use server';

import { prisma } from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export async function salvar({ id, data, ...dados }) {
    try {
        const registro = { ...dados, data: new Date(data) };
        if (id) await prisma.aluguel.update({ where: { id }, data: registro });
        else await prisma.aluguel.create({ data: registro });
    } catch {
        return { erro: 'Erro ao salvar o aluguel' };
    }
    revalidatePath('/alugueis');
}

export async function excluir(id) {
    try {
        await prisma.aluguel.delete({ where: { id } });
    } catch {
        return { erro: 'Erro ao excluir o aluguel' };
    }
    revalidatePath('/alugueis');
}
