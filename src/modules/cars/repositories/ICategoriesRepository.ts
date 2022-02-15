import { Category } from "../model/Category";

interface ICategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;

  list(): Category[];

  create({ name, description }: ICategoryDTO): void;
}

export { ICategoryDTO, ICategoriesRepository };
