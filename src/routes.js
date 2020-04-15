import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ hello: 'mundo' }));

export default routes;
