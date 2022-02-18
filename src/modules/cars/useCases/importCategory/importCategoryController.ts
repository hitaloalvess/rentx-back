import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    const { file } = request;

    if (!file) {
      return response.json({ error: 'File is required' });
    }

    await importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
