import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRouter);

router.use('/specifications', specificationsRouter);

export { router };
