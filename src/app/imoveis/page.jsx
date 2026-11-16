import { excluir, salvar } from '@actions/imoveis';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    {
        title: 'Endereço',
        dataIndex: 'endereco',
    },
    {
        title: 'Cep',
        dataIndex: 'cep',
    },
    {
        title: 'Cômodos',
        dataIndex: 'comodos',
    },
    {
        title: 'Quantidade de hóspedes',
        dataIndex: 'quantidade_hospedes',
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
    },
    {
        title: 'Disponibilidade',
        dataIndex: 'disponivel',
    },
    {
        title: 'Cliente',
        dataIndex: 'cliente_nome',
    },
];
export default async function Imoveis() {
    const [imoveis, clientes] = await Promisse.all([
        prisma.imovel.findMany({ orderBy: { modelo: 'asc' }, include: { cliente: true } }),
        prisma.cliente.findMany({ orderBy: { modelo: 'asc' } }),
    ]);

    const registros = imoveis.map(({ cliente, ...imovel }) => ({
        ...imovel,
        cliente_nome: cliente.nome,
    }));

    const campos = [
        {
            name: 'endereco',
            label: 'Endereço',
        },
        {
            name: 'cep',
            label: 'Cep',
        },
        {
            name: 'comodos',
            label: 'Cômodos',
        },
        {
            name: 'quantidades_hospedes',
            label: 'Quantidade de hóspedes',
        },
        {
            name: 'valor',
            label: 'Valor',
        },
        {
            name: 'disponivel',
            label: 'Disponibilidade',
        },
        {
            name: 'cliente_nome',
            label: 'Cliente',
            opcoes: opcoes.map((c) => ({ value: c.id, label: c.nome })),
        },
    ];
    return <Crud titulo="Imovéis" {...{ colunas, campos, registros, salvar, excluir }} />;
}
