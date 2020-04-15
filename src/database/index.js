import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Dweller from '../app/models/Dweller';
import Apartment from '../app/models/Apartment';
import Block from '../app/models/Block';

const models = [User, Dweller, Apartment, Block];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
