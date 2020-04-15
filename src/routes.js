import { Router } from 'express';

import UserController from './app/controllers/UserController';
import DwellerController from './app/controllers/DwellerController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/dwellers', DwellerController.store);

export default routes;
