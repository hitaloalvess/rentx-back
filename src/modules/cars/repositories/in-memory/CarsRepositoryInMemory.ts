import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
