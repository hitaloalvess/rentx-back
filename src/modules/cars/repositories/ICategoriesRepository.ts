import { Category } from '../entities/Category';

interface ICategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;

  list(): Promise<Category[]>;

  create({ name, description }: ICategoryDTO): Promise<void>;
}

export { ICategoryDTO, ICategoriesRepository };
