import Sequelize, { Model } from 'sequelize';

class Block extends Model {
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

export default Block;
