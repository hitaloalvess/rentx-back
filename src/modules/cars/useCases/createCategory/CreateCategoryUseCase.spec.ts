import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: ICategoriesRepository;
let createCategoriesUseCase: CreateCategoryUseCase;

describe('Create new category', () => {
  beforeEach(() => {
    // Executa essa função antes de cada teste
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoriesUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Description category test',
    };

    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(createdCategory).toHaveProperty('id'); // Verifica se a propriedade passada como parâmetro existe dentro do objeto
  });

  it('should not be able to create new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Description category test',
      };

      await createCategoriesUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoriesUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError); // Verifica se o objeto retornado em caso de erro é do tipo AppError
  });
});
