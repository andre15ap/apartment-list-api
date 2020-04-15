import Sequelize, { Model } from 'sequelize';

class Apartment extends Model {
  static init(sequelize) {
    super.init(
      {
        identifier: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Apartment;
