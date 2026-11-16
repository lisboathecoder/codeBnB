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
        optional: true,
    },
];
export default async function Clientes({ searchParams }) {
    const busca = ({ busca = '' } = await searchParams);
    const buscaMinuscula = busca.toLowerCase();

    const clientes = await prisma.cliente.findMany({ orderby: { nome: 'asc' } });
    const registros = clientes.map((cliente) =>
        ({ ...cliente, cpf: descriptografar(item.cpf) }).filter(
            (cliente) =>
                cliente.nome.toLowerCase().includes(buscaMinuscula) ||
                cliente.cpf.includes(buscaMinuscula),
        ),
    );
    <Crud titulo="Clientes" {...{ colunas, campos, registros, salvar, excluir, busca }}></Crud>;
}
