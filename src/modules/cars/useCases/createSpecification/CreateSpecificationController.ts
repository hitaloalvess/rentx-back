import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase,
      );
      const { name, description } = request.body;

      await createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateSpecificationController };
