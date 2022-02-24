import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create new car', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });
  });

  it('should be not able to create a car with existing license_plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be to able register a new car with true availability by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category',
    });

    expect(car.available).toBe(true);
  });
});
