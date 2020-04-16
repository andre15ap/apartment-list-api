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

    this.addHook('beforeSave', async (dweller) => {
      if (dweller.responsible) {
        const { Op } = Sequelize;
        await Dweller.update(
          {
            responsible: false,
          },
          {
            where: {
              responsible: true,
              apartment_id: dweller.apartment_id,
              id: { [Op.not]: dweller.id },
            },
          }
        );
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Apartment, {
      foreignKey: 'apartment_id',
      as: 'apartment',
    });
  }
}

export default Dweller;
