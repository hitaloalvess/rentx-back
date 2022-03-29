import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists');
    }

    images_name.map(async image_name => {
      await this.carImagesRepository.create(car_id, image_name);
      await this.storageProvider.save(image_name, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };
