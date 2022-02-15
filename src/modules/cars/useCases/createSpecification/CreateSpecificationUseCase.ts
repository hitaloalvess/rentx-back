import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
