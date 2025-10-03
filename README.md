# 📝 Todo List com Login

Um sistema de Lista de Tarefas (CRUD), com Autenticação de Usuário e persistência de dados. Desenvolvidos básicamente em **Next**, **Node**, **Typescript** sendo responsivo, claro com ajuda de outras bibliotecas.

## ✨ Funcionalidades

- 🔐 **Autenticação completa** (Login, Cadastro, Logout)
- 📝 **CRUD de tarefas** (Criar, listar, editar, excluir)
- ✅ **Marcar tarefas como concluídas**
- 🔒 **Middleware de autenticação** com JWT
- 🎨 **Interface moderna** com TailwindCSS e Shadcn/UI
- 📱 **Design responsivo**
- 🔔 **Notificações** com toasts
- 🍪 **Persistência de sessão** com cookies

## 🛠️ Tecnologias

### Frontend
- ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)
- ![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)
- ![Zustand](https://img.shields.io/badge/Zustand-5.0.8-FF6B6B?logo=zustand)
- ![Axios](https://img.shields.io/badge/Axios-1.12.2-5A29E4?logo=axios)
- ![Zod](https://img.shields.io/badge/Zod-4.1.11-3E67B1?logo=zod)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
- ![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
- ![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?logo=prisma)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-316192?logo=postgresql)
- ![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens)
- ![bcrypt](https://img.shields.io/badge/bcrypt-6.0.0-yellow?logo=security)

### UI/UX
- ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000)
- ![Lucide Icons](https://img.shields.io/badge/Lucide-0.544.0-FF6B6B?logo=lucide)
- ![Sonner](https://img.shields.io/badge/Sonner-2.0.7-4CAF50) (Toast notifications)

## 🚀 Como executar

### 1. Clone o repositório
```bash
git clone https://github.com/DouglasSuzukiDS/todo-with-login.git
cd todo-with-login
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

**Configure as variáveis de ambiente:**
Edite o arquivo `.envExample` para `.env` com suas credencias USER e PASSWORD de coneção do seu DB PostgreSQL:

```js
Necessário criar o DB/Schema no Postgre chamado todo
```
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/todo?schema=public"

PORT=3001

JWT_SECRET_KEY="sua-chave-secreta-jwt-muito-forte-aqui"
```

**Execute as migrações:**
```bash
npx prisma migrate dev
npx prisma generate
```

**Inicie o servidor:**
```bash
npm run server
```
🌐 Backend rodando em: `http://localhost:3001`

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

**Configure as variáveis de ambiente:**

Edite o arquivo `.envExample` para `.env`:
```env
NEXT_PUBLIC_API_URL="Insira o endereço da sua API"
```

**Inicie o desenvolvimento:**
```bash
npm run dev
```
🌐 Frontend rodando em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
todo-with-login/
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Controladores da API
│   │   ├── 📂 services/        # Services para conexão com o DB
│   │   ├── 📂 middleware/      # Middleware de autenticação
│   │   ├── 📂 routes/          # Definição das rotas
│   │   ├── 📂 utils/           # Utilitários (JWT, Prisma)
│   │   ├── 📂 schemas/         # Validação com Zod
│   │   └── 📄 server.ts        # Servidor Express
│   ├── 📂 prisma/
│   │   └── 📄 schema.prisma    # Schema do banco
│   └── 📄 package.json
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 app/             # App Router (Next.js 15)
│   │   ├── 📂 components/      # Componentes React
│   │   │   ├── 📂 auth/        # Componentes de autenticação
│   │   │   ├── 📂 todo/        # Componentes de tarefas
│   │   │   └── 📂 ui/          # Shadcn/UI components
│   │   ├── 📂 store/           # ContextAPI (Zustand)
│   │   ├── 📂 types/           # Types utilizados
│   │   └── 📂 utils/           # Utilitários (API, cookies)
│   └── 📄 package.json
│
└── 📄 README.md
```

## 🔐 API Endpoints

### Autenticação
- `POST /auth/signup` - Cadastro de usuário
- `POST /auth/signin` - Login de usuário  
- `POST /auth/signout` - Logout de usuário

### Usuários
- `GET /user?email=` - Buscar usuário por email
- `POST /user/token` - Buscar usuário por token
- `PUT /user` - Atualizar usuário
- `DELETE /user/:id` - Deletar usuário

### Tarefas
- `GET /todos=` - Listar tarefas do usuário
- `POST /todo` - Criar nova tarefa
- `PUT /todo/:id` - Atualizar tarefa
- `PUT /todo/:id/completed` - Alternar status da tarefa
- `DELETE /todo/:id` - Deletar tarefa

## 🎯 Funcionalidades em Destaque

### 🔒 Sistema de Autenticação
- **JWT Token** para autenticação
- **Middleware de proteção** nas rotas privadas
- **Hash de senhas** com bcrypt
- **Persistência de sessão** com cookies httpOnly

### 📝 Gerenciamento de Tarefas
- **CRUD completo** de tarefas
- **Marcar como concluída** com um clique
- **Interface intuitiva** com ícones Lucide
- **Feedback visual** com toasts

### 🎨 Interface Moderna
- **Design responsivo** para mobile e desktop
- **Componentes reutilizáveis** com Shadcn/UI
- **Validação de formulários** com Zod

### 🏗️ Arquitetura
- **Separação de responsabilidades** (Controllers, Services, Middleware)
- **Validação de dados** com Zod
- **Estado global** com Zustand
- **Tipagem forte** com TypeScript