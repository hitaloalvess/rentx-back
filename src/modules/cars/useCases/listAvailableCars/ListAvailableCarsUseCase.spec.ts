import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 10,
      license_plate: 'ZZZZZZ',
      fine_amount: 20,
      brand: 'Fake brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to to list all avaiblable cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 10,
      license_plate: 'ZZZZZZ',
      fine_amount: 20,
      brand: 'Car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car 1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to to list all avaiblable cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 10,
      license_plate: 'ZZZZZZ',
      fine_amount: 20,
      brand: 'Car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to to list all avaiblable cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 10,
      license_plate: 'ZZZZZZ',
      fine_amount: 20,
      brand: 'Car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
