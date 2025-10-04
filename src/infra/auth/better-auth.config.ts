import { betterAuth } from 'better-auth';
import { PrismaClient } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3333',
  basePath: '/api/auth',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Defina como true se quiser verificação de email
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'CLIENT',
      },
    },
  },
  socialProviders: {
    // Desabilitando provedores sociais por enquanto para simplificar
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    //   enabled: !!(
    //     process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    //   ),
    // },
  },
  plugins: [
    // Você pode adicionar plugins aqui conforme necessário
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
