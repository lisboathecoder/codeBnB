import { excluir, salvar } from '@actions/clientes';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    {
        title: 'Nome',
        dataIndex: 'nome',
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
    },
    {
        title: 'Celular',
        dataIndex: 'celular',
    },
];

const campos = [
    {
        name: 'nome',
        label: 'Nome',
    },
    {
        name: 'cpf',
        label: 'CPF',
    },
    {
        name: 'celular',
        label: 'Celular',
        opcional: true,
    },
];
export default async function Clientes({ searchParams }) {
    const { busca = '' } = await searchParams;
    const buscaMinuscula = busca.toLowerCase();

    const clientes = await prisma.cliente.findMany({ orderBy: { nome: 'asc' } });
    const registros = clientes
        .map((cliente) => ({ ...cliente, cpf: descriptografar(cliente.cpf) }))
        .filter(
            (cliente) =>
                cliente.nome.toLowerCase().includes(buscaMinuscula) ||
                cliente.cpf.includes(buscaMinuscula),
        );
    return <Crud titulo="Clientes" {...{ colunas, campos, registros, salvar, excluir, busca }} />;
}
