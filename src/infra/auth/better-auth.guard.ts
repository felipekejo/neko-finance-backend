import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { auth } from './better-auth.config';
import { IS_PUBLIC_KEY } from './public';

// Extend Request interface to include user and session
declare module 'express' {
  interface Request {
    user?: any;
    session?: any;
  }
}

@Injectable()
export class BetterAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    try {
      const session = await auth.api.getSession({
        headers: request.headers as any,
      });

      if (!session) {
        throw new UnauthorizedException('No valid session found');
      }

      // Adiciona a sessão e usuário ao request para uso posterior
      request.user = session.user;
      request.session = session.session;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid session');
    }
  }
}
