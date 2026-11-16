import { excluir, salvar } from '@actions/alugueis';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Data de início', dataIndex: 'data_inicio' },
    { title: 'Data de fim', dataIndex: 'data_fim' },
    { title: 'Imóvel', dataIndex: 'imovel_endereco' },
    { title: 'Disponibilidade', dataIndex: 'imovel_disponivel' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
    { title: 'CPF', dataIndex: 'cliente_cpf' },
];

export default async function Alugueis() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.aluguel.findMany({
            orderBy: { data_inicio: 'asc' },
            include: { imovel: { include: { cliente: true } } },
        }),
        prisma.imovel.findMany({ orderBy: { endereco: 'asc' }, include: { cliente: true } }),
    ]);

    const registros = alugueis.map(({ id, data_inicio, data_fim, imovel_id, imovel }) => ({
        id,
        imovel_id,
        data_inicio: data_inicio.toISOString().slice(0, 10),
        data_fim: data_fim.toISOString().slice(0, 10),
        imovel_endereco: imovel.endereco,
        imovel_disponivel: imovel.disponivel,
        cliente_nome: imovel.cliente.nome,
        cliente_cpf: descriptografar(imovel.cliente.cpf),
    }));

    const campos = [
        { name: 'data_inicio', label: 'Data de início', tipo: 'date' },
        { name: 'data_fim', label: 'Data de fim', tipo: 'date' },
        {
            name: 'imovel_id',
            label: 'Imóvel',
            opcoes: imoveis.map((i) => ({
                value: i.id,
                label: `${i.endereco} (${i.cliente.nome})`,
            })),
        },
    ];

    return <Crud titulo="Aluguéis" {...{ colunas, campos, registros, salvar, excluir }} />;
}
