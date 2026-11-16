## Requisitos

### 1.1 Requisitos Funcionais do Sistema

| Código | Função                       | Comportamento esperado                                                                                                                   |
| ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| RF01   | Verificar identidade         | Analisa usuário e senha e informa quando os dados fornecidos não conferem.                                                               |
| RF02   | Carregar área inicial        | Ao concluir a entrada, direciona a pessoa para o ambiente principal da aplicação.                                                        |
| RF03   | Desconectar usuário          | Invalida o token atual; sem essa ação, a autorização termina depois de 60 minutos.                                                       |
| RF04   | Criar cadastro de cliente    | Solicita nome e CPF, tornando ambos obrigatórios, rejeitando um CPF repetido e permitindo informar o celular.                            |
| RF05   | Encontrar cliente registrado | Realiza a busca pelo nome ou pelo CPF informado.                                                                                         |
| RF06   | Alterar cadastro de cliente  | Substitui os dados associados ao cliente selecionado por seu código.                                                                     |
| RF07   | Apagar cadastro de cliente   | Exclui o cliente escolhido quando não existir imóvel vinculado a ele.                                                                    |
| RF08   | Registrar imóvel             | Recebe endereço, cômodos, quantidade de hóspedes, valor e cliente como dados obrigatórios.                                               |
| RF09   | Corrigir dados do imóvel     | Atualiza o endereço, os cômodos, a quantidade de hóspedes, o valor, a disponibilidade e o cliente usando o identificador correspondente. |
| RF10   | Apagar imóvel                | Permite retirar o registro, desde que não haja aluguel relacionado ao imóvel.                                                            |
| RF11   | Reservar horário             | Registra um novo aluguel informando a data e o imóvel envolvidos.                                                                        |
| RF12   | Consultar reservas           | Lista os aluguéis em sequência cronológica e mostra os dados do cliente e do imóvel.                                                     |
| RF13   | Ajustar reserva              | Possibilita substituir a data ou o imóvel de um aluguel existente.                                                                       |
| RF14   | Desfazer reserva             | Remove o aluguel escolhido após o usuário confirmar a operação.                                                                          |

### 1.2 Critérios de qualidade

| Código | Critério                     | Regra de funcionamento                                                                                       |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| RNF01  | Sigilo dos dados             | Informações de acesso e de cadastro devem permanecer protegidas contra leitura, uso ou modificação indevida. |
| RNF02  | Consistência das informações | As operações precisam manter os registros corretos, evitando extravios e repetições não permitidas.          |
| RNF03  | Restrição por perfil         | Recursos da aplicação só podem ser utilizados por pessoas identificadas e com permissão correspondente.      |

## 2 Requisitos de Infraestrutura

| Tecnologia             | Versão / ambiente    |
| ---------------------- | -------------------- |
| JavaScript             | Node.js 24           |
| Next.js                | 16                   |
| React e React DOM      | 19                   |
| bcryptjs               | 3                    |
| jsonwebtoken           | 9                    |
| node:crypto            | Integrado ao Node.js |
| PostgreSQL             | 18                   |
| Prisma e Prisma Client | 6                    |
| Ant Design             | 6                    |
