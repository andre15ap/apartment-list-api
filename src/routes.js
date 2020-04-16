import { Router } from 'express';

import UserController from './app/controllers/UserController';
import DwellerController from './app/controllers/DwellerController';
import ApartmentController from './app/controllers/ApartmentControllers';
import BlockController from './app/controllers/BlockControllers';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', AuthController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/dwellers', DwellerController.store);

routes.post('/apartments', ApartmentController.store);

routes.post('/blocks', BlockController.store);
routes.get('/blocks', BlockController.index);
routes.put('/blocks/:id', BlockController.update);
routes.delete('/blocks/:id', BlockController.delete);

export default routes;
