import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListRentalsByUserUseCase{

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository : IRentalsRepository
    ){}

    async execute(user_id : string){
        const rentalsByUser = this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };