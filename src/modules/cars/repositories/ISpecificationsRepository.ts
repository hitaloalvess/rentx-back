import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;

  findByName(name: string): Promise<Specification | undefined>;

  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationDTO };
