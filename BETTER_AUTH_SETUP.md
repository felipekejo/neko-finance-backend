# Better Auth Setup - Neko Finance Backend

## Visão Geral

Este projeto agora utiliza o Better Auth para gerenciamento de autenticação, oferecendo uma solução moderna e flexível para login, registro e gerenciamento de sessões.

## Configuração Inicial

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=seu-secret-super-seguro-aqui-com-pelo-menos-32-caracteres
BETTER_AUTH_URL=http://localhost:3333

# Opcional: Google OAuth (se quiser usar login com Google)
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

### 2. Migração do Banco de Dados

Execute as migrações para criar as tabelas necessárias do Better Auth:

```bash
npx prisma migrate dev --name "add-better-auth-tables"
npx prisma generate
```

## Como Usar

### Endpoints Disponíveis

O Better Auth expõe automaticamente vários endpoints através da rota `/api/auth/*`:

#### Registro de Usuário
```http
POST /api/auth/sign-up
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Login
```http
POST /api/auth/sign-in
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Logout
```http
POST /api/auth/sign-out
```

#### Verificar Sessão
```http
GET /api/auth/session
```

### Uso nos Controllers

Para proteger rotas e acessar o usuário autenticado:

```typescript
import { Controller, Get } from '@nestjs/common'
import { CurrentUser, BetterAuthUser } from '../auth/better-auth-user.decorator'

@Controller('/protected-route')
export class ExampleController {
  @Get()
  async getProtectedData(@CurrentUser() user: BetterAuthUser) {
    // O usuário já está autenticado aqui
    return {
      message: `Olá, ${user.name}!`,
      userId: user.id,
      email: user.email,
    }
  }
}
```

### Tornar Rotas Públicas

Para tornar uma rota pública (não protegida por autenticação):

```typescript
import { Public } from '../auth/public'

@Controller('/public-route')
@Public() // Aplica a toda a classe
export class PublicController {
  @Get()
  @Public() // Ou aplica apenas a um método específico
  async getPublicData() {
    return { message: 'Esta rota é pública' }
  }
}
```

## Frontend Integration

### JavaScript/TypeScript Client

```typescript
// Exemplo de como fazer login do frontend
const signIn = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3333/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Importante para cookies de sessão
  })
  
  if (response.ok) {
    const data = await response.json()
    console.log('Login realizado com sucesso:', data)
  }
}

// Verificar sessão atual
const getSession = async () => {
  const response = await fetch('http://localhost:3333/api/auth/session', {
    credentials: 'include',
  })
  
  if (response.ok) {
    const session = await response.json()
    return session
  }
  return null
}
```

### React Client (com better-auth/react)

Se você estiver usando React no frontend, pode instalar o cliente oficial:

```bash
npm install better-auth @better-auth/react
```

```typescript
// auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333",
})

// component.tsx
import { authClient } from "./auth-client"

export function LoginForm() {
  const { signIn } = authClient
  
  const handleSubmit = async (email: string, password: string) => {
    await signIn.email({
      email,
      password,
    })
  }
  
  return (
    // Seu formulário aqui
  )
}
```

## Recursos Avançados

### Provedores Sociais (Google OAuth)

Se configurou as credenciais do Google, você pode usar:

```http
GET /api/auth/sign-in/google
```

### Verificação de Email

Para habilitar verificação de email, atualize a configuração:

```typescript
// better-auth.config.ts
export const auth = betterAuth({
  // ...outras configurações
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // Mude para true
  },
  // Adicione configuração de email
  emailVerification: {
    sendOnSignUp: true,
    // Configurar provedor de email (SendGrid, Resend, etc.)
  },
})
```

### Campos Customizados do Usuário

O sistema já está configurado para incluir o campo `role` do usuário. Para adicionar mais campos:

```typescript
// better-auth.config.ts
user: {
  additionalFields: {
    role: {
      type: 'string',
      required: false,
      defaultValue: 'CLIENT',
    },
    // Adicione novos campos aqui
    phone: {
      type: 'string',
      required: false,
    },
  },
},
```

## Migração do Sistema Atual

### Convivência com JWT Atual

O Better Auth pode conviver com seu sistema JWT atual. Para migrar gradualmente:

1. Mantenha as rotas JWT existentes funcionando
2. Use o Better Auth para novas funcionalidades
3. Migre rotas uma por vez conforme necessário

### Dados Existentes

Se você já tem usuários cadastrados, pode ser necessário migrar os dados ou implementar um sistema de migração automática no primeiro login.

## Troubleshooting

### Erro de CORS

Se encontrar problemas de CORS, certifique-se de que o frontend está enviando cookies:

```typescript
fetch('/api/auth/sign-in', {
  credentials: 'include', // Importante!
  // ...
})
```

### Problemas de Sessão

Verifique se:
1. O `BETTER_AUTH_SECRET` está definido
2. O `BETTER_AUTH_URL` corresponde à URL do seu servidor
3. Os cookies estão sendo aceitos pelo navegador

### Banco de Dados

Se houver problemas com as tabelas do Better Auth:

```bash
npx prisma db push
npx prisma generate
```

## Recursos Adicionais

- [Documentação oficial do Better Auth](https://www.better-auth.com/)
- [Exemplos no GitHub](https://github.com/better-auth/better-auth)
- [Guias de integração](https://www.better-auth.com/docs/integrations)

## Próximos Passos

1. Teste os endpoints de autenticação
2. Implemente o frontend com os novos endpoints
3. Configure verificação de email (opcional)
4. Adicione provedores sociais (opcional)
5. Migre as rotas existentes gradualmente