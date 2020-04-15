import { Router } from 'express';

import UserController from './app/controllers/UserController';
import DwellerController from './app/controllers/DwellerController';
import ApartmentController from './app/controllers/ApartmentControllers';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/dwellers', DwellerController.store);

routes.post('/apartments', ApartmentController.store);

export default routes;
