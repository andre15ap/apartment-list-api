import Sequelize, { Model } from 'sequelize';

class Dweller extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        phone: Sequelize.STRING,
        responsible: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Dweller;
