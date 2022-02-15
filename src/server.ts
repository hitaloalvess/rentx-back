import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { categoriesRouter } from './routes/categories.routes';
import { specificationsRouter } from './routes/specifications.routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRouter);

app.use('/specifications', specificationsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => console.log('Server listen, port 3333'));
