import { excluir, salvar } from '@actions/aluguels';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Data', dataIndex: 'data' },
    { title: 'Endereço', dataIndex: 'imovel_endereco' },
    { title: 'CEP', dataIndex: 'imovel_cep' },
    { title: 'Quantidade de Hóspedes', dataIndex: 'imovel_quantidades_hospedes' },
    { title: 'Comôdos', dataIndex: 'imovel_comodos' },
    { title: 'Valor', dataIndex: 'imovel_valor' },
    { title: 'Disponibilidade', dataIndex: 'imovel_disponivel' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
    { title: 'CPF', dataIndex: 'cliente_cpf' },
];

export default async function Alugueis() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.aluguel.findMany({
            orderBy: { data: 'asc' },
            include: { imovel: { include: { cliente: true } } },
        }),
        prisma.imovel.findMany({ orderBy: { modelo: 'asc' }, include: { cliente: true } }),
    ]);

    const registros = alugueis.map(({ id, data, imovel_id, imovel }) => ({
        id,
        imovel_id,
        data: data.toISOString().slice(0, 10),
        imovel_endereco: imovel.endereco,
        imovel_cep: imovel.cep,
        imovel_quantidades_hospedes: imovel.quantidades_hospedes,
        imovel_comodos: imovel.comodos,
        imovel_valor: imovel.valor,
        imovel_disponivel: imovel.disponivel,
        cliente_nome: imovel.cliente.nome,
        cliente_cpf: descriptografar(imovel.cliente.cpf),
    }));

    const campos = [
        { name: 'data', label: 'Data', tipo: 'date' },
        {
            name: 'imovel_id',
            label: 'Imovél',
            opcoes: imoveis.map((i) => ({
                value: i.id,
                label: `${i.modelo} (${i.cliente.nome})`,
            })),
        },
    ];

    return <Crud titulo="Alugueis" {...{ colunas, campos, registros, salvar, excluir }} />;
}
