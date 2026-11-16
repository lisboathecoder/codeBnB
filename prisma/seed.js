import bcrypt from 'bcryptjs';

try {
    process.loadEnvFile();
} catch {
    console.error('   ❌ parceria ... arquivo .env não encontrado');
    process.exit(1);
}

const { criptografar } = await import('../src/lib/cripto.js');
const { prisma } = await import('../src/lib/prisma.js');

const dados = {
    usuario: [
        {
            nome: 'admin',
            senha: bcrypt.hashSync('admin123', 10),
        },
        {
            nome: 'lisboa',
            senha: bcrypt.hashSync('lisboa123', 10),
        },
        {
            nome: 'fiot',
            senha: bcrypt.hashSync('fabio123', 10),
        },
    ],
    cliente: [
        {
            nome: 'Ana Silva',
            cpf: criptografar('123.456.789-01'),
            celular: '(11) 91111-1111',
        },
        {
            nome: 'Bruno Santos',
            cpf: criptografar('234.567.890-12'),
            celular: '(11) 92222-2222',
        },
        {
            nome: 'Carla Oliveira',
            cpf: criptografar('345.678.901-23'),
            celular: '(11) 93333-3333',
        },
    ],
    imovel: [
        {
            endereco: 'Rua das Flores, 100',
            cep: '13220-200',
            comodos: 'Sala, cozinha e 2 quartos',
            quantidade_hospedes: 4,
            valor: 250.0,
            disponivel: true,
            cliente_id: 1,
        },
        {
            endereco: 'Avenida Central, 250',
            cep: '12234-234',
            comodos: 'Sala, cozinha e 3 quartos',
            quantidade_hospedes: 6,
            valor: 350.0,
            disponivel: true,
            cliente_id: 2,
        },
        {
            endereco: 'Estrada do Sol, 500',
            comodos: 'Sala, cozinha e 4 quartos',
            cep: '16349-785',
            quantidade_hospedes: 8,
            valor: 500.0,
            disponivel: true,
            cliente_id: 3,
        },
    ],
    aluguel: [
        {
            data: new Date('2026-12-05'),
            imovel_id: 1,
        },
        {
            data: new Date('2026-12-12'),
            imovel_id: 2,
        },
        {
            data: new Date('2026-12-19'),
            imovel_id: 3,
        },
    ],
};

const tabelas = Object.keys(dados).reverse().join(', ');
await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tabelas} RESTART IDENTITY CASCADE`);
console.log('   🧹 registros anteriores apagados (ids reiniciados)');

for (const [tabela, data] of Object.entries(dados)) {
    const { count } = await prisma[tabela].createMany({ data });
    console.log(`   ✅ ${tabela}: ${count} registros`);
}

await prisma.$disconnect();
