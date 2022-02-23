import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICategoryDTO,
} from '../../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}

export { CategoriesRepository };
