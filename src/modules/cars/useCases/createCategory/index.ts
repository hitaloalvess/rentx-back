import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepositories = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositories);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
