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

  static associate(models) {
    this.belongsTo(models.Block, {
      foreignKey: 'block_id',
      as: 'block',
    });
  }
}

export default Apartment;
