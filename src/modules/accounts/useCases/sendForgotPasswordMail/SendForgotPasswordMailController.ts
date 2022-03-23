import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    const { email } = request.body;

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
