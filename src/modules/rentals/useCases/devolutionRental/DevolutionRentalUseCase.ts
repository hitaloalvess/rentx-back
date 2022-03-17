import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

interface IRequest{
    id: string;
    user_id: string;
}


class DevolutionRentalUseCase{
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ){}

    async execute({ id, user_id } : IRequest): Promise<Rental>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if(!rental){
            throw new AppError("Rental does not exists");
        }

        //Verificar o tempo de aluguel
        const dateNow = this.dateProvider.getDateNow();

        let daily = this.dateProvider.compareInHours(
            dateNow,
            rental.expected_return_date,
        );

        if(daily <= 0){
            daily = minimum_daily;
        }
        
        //Calcular atraso 
        let total = 0;

        const delay = this.dateProvider.compareInHours(
            dateNow,
            rental.expected_return_date,
        );

        //Se atraso for maior que 0, calcular o valor da multa
        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        //Calcular o total das diarias
        total += daily * car.daily_rate;

        //Atualizar o valor de entrega do carro dentro de rental
        rental.end_date = this.dateProvider.getDateNow();

        //Atualizar o total do aluguel dentro de rental
        rental.total = total;

        //Atribuir as atualizações de rental
        await this.rentalsRepository.create(rental);

        //Atualizar o available de carro
        await this.carsRepository.updateAvailable(car.id, true);

        //Retornar rental
        return rental;
    }

}

export { DevolutionRentalUseCase };