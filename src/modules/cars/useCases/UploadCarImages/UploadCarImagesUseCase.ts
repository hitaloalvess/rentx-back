import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists');
    }

    images_name.map(async image_name => {
      await this.carImagesRepository.create(car_id, image_name);
      // ADICIONAR VALIDAÇÃO PARA NÃO DEIXAR QUE IMAGENS COM MESMO NOME SEJAM CADASTRADAS
    });
  }
}

export { UploadCarImagesUseCase };
