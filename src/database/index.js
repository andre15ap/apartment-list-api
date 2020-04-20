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
    const env = process.env.NODE_ENV;
    this.connection = new Sequelize(databaseConfig[env]);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
