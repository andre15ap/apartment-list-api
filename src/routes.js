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

routes.get('/dwellers', DwellerController.index);
routes.post('/dwellers', DwellerController.store);
routes.put('/dwellers/:id', DwellerController.update);
routes.delete('/dwellers/:id', DwellerController.delete);
routes.get('/dwellers-findall', DwellerController.findAll);

routes.get('/apartments', ApartmentController.index);
routes.post('/apartments', ApartmentController.store);
routes.put('/apartments/:id', ApartmentController.update);
routes.delete('/apartments/:id', ApartmentController.delete);
routes.get('/apartments-findall', ApartmentController.findAll);

routes.get('/blocks', BlockController.index);
routes.post('/blocks', BlockController.store);
routes.put('/blocks/:id', BlockController.update);
routes.delete('/blocks/:id', BlockController.delete);
routes.get('/blocks-findall/', BlockController.findAll);

export default routes;
