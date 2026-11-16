'use server';

import { prisma } from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export async function salvar({ id, ...data }) {
    try {
        if (id) await prisma.imovel.update({ where: { id }, data });
        else await prisma.imovel.create({ data });
    } catch {
        return { erro: 'Erro ao salvar o imovél' };
    }
    revalidatePath('/imoveis');
}

export async function excluir(id) {
    try {
        await prisma.imovel.delete({ where: { id } });
    } catch (e) {
        if (e.code === 'P2003') return { erro: 'Imovél já tem agendamentos cadastrados' };
        return { erro: 'Erro ao excluir o imovél' };
    }
    revalidatePath('/imoveis');
}
