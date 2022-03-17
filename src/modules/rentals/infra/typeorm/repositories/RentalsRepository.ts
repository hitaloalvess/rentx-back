import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/respositories/IRentalsRepository';
import { Repository, getRepository } from 'typeorm';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id , end_date: null }});
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id , end_date: null }});
  }

  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total
    });
    this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne( id );
  }
}

export { RentalsRepository };
