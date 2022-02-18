import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const { name, description } = request.body;

      await createCategoryUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateCategoryController };
