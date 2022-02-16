import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const upload = multer({
  dest: './tmp',
});

const categoriesRouter = Router();

categoriesRouter.get('/', (request, response) => {
  listCategoriesController().handle(request, response);
});

categoriesRouter.post('/', (request, response) => {
  createCategoryController().handle(request, response);
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  importCategoryController().handle(request, response);
});

export { categoriesRouter };
