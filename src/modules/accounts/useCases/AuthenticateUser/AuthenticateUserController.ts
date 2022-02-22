import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUseCase } from './AutheticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    const { email, password } = request.body;

    const token = await authenticateUseCase.execute({ email, password });

    return response.status(201).json(token);
  }
}

export { AuthenticateUserController };
