import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handleExeptions();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  handleExeptions() {
    this.server.use(async (err, req, res, next) => {
      return res
        .status(500)
        .json({ error: 'Sentimos muito, algo de errado aconteceu :(' });
    });
  }
}

export default new App().server;
