# Leads API - Sistema de Gerenciamento de Leads

![Status do Projeto](https://img.shields.io/badge/Status-Finalizado-success)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licença-ISC-green)

## 📋 Descrição

Leads API é uma aplicação backend desenvolvida para gerenciamento de leads em campanhas de marketing. O sistema permite a organização de leads em grupos, associação a campanhas, e rastreamento do status de cada lead durante seu ciclo de vida no funil de vendas.

O projeto foi estruturado seguindo princípios de arquitetura limpa e padrões de design modernos, focados em escalabilidade e manutenibilidade.

### Principais Funcionalidades

- **Gerenciamento de Leads**: Cadastro, atualização, consulta e exclusão de leads
- **Agrupamento de Leads**: Organização de leads em grupos para melhor segmentação
- **Campanhas de Marketing**: Criação e gerenciamento de campanhas com datas específicas
- **Ciclo de Vida dos Leads**: Rastreamento do status dos leads durante o processo de conversão
- **API RESTful**: Endpoints bem definidos para integração com frontend ou sistemas terceiros

---

## 🛠️ Tecnologias Utilizadas

### ⚙️ Core
- **TypeScript**
- **Node.js**
- **Express**: Framework web para a construção da API REST
- **Prisma ORM**: ORM para acesso ao banco de dados
- **PostgreSQL**: Banco de dados relacional

### 📚 Bibliotecas
- **Zod**: Validação de esquemas e tipagem em runtime
- **CORS**: Middleware para configuração de Cross-Origin Resource Sharing (usar caso escalar)

### 🧰 Ferramentas de Desenvolvimento
- **TSX**: Execução de TypeScript com recarga automática durante desenvolvimento
- **TypeScript Compiler**: Compilação para JavaScript

---


### Princípios e Padrões de Design
- **Repository Pattern**: Abstração da lógica de acesso a dados
- **Dependency Injection**: Inversão de controle para melhor testabilidade
- **Schema Validation**: Validação de dados de entrada com Zod
- **Error Handling**: Tratamento de erros centralizado
- **REST API**: Seguindo princípios de design RESTful para APIs
- **Strict Typing**: Tipos TypeScript em toda a aplicação

---

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/eduardomatos7/lead-api.git
   cd lead-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/lead_db?schema=public"
   PORT=3000
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Scripts Disponíveis
- `npm run dev`: Executa o servidor em modo de desenvolvimento com recarga automática
- `npm run build`: Compila o código TypeScript para JavaScript
- `npm run start`: Executa a versão compilada para produção

---

## 📸 Exemplos de Uso no Postman

### Gestão de Leads

#### Listagem de Leads
![Criação de Lead](docs/images/image.png)

*Exemplo de requisição GET para listar todos os Leads do sistema*

#### Todas os tipos de requisição estruturados
![Consulta de Leads com Filtros](docs/images/image-1.png)
*Aqui são separadas todas as requisições feitas*

### Gestão de grupos e paginação

#### Todos os tipos de paginação
![Detalhes da Campanha](docs/images/image-2.png)

*Visualização detalhada de todas as consultas por paginação*

---

## 🌟 Boas Práticas Implementadas

- **Validação de Entrada**: Validação rigorosa de dados de entrada usando Zod
- **Tratamento de Erros**: Sistema centralizado de tratamento de erros HTTP
- **Tipagem Estrita**: Uso extensivo de interfaces e tipos TypeScript
- **Separação de Responsabilidades**: Cada componente com responsabilidades bem definidas
- **Injeção de Dependências**: Componentes desacoplados e testáveis
- **Paginação e Filtros**: Implementação de paginação e filtros para endpoints de listagem
- **Transações de Banco de Dados**: Uso de transações para operações complexas
- **Respostas HTTP Semânticas**: Uso apropriado de códigos de status HTTP
- **Nomenclatura Consistente**: Padrão consistente para nomeação de variáveis e funções

---

## 📄 Licença
Este projeto está licenciado sob a licença ISC - veja o arquivo LICENSE para detalhes.

---

## 📞 Contato
- GitHub: [@eduardomatos7](https://github.com/eduardomatos7)
- Email: [emfs@cin.ufpe.br](mailto:emfs@cin.ufpe.br)

---

