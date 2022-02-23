import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // pegar token do header
  const authHeader = request.headers.authorization;

  // Verificar se token existe
  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  // extrair token
  const [, token] = authHeader.split(' ');

  try {
    // verificar se o token é valido, e extrair id do usuário contido no token
    const { sub: user_id } = verify(
      token,
      '0f1e320f0536e150101e4d4b4dc6abd6',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    // Verificar se usuário existe
    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
