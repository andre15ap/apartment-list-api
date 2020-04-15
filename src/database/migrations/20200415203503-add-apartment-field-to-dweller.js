module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('dwellers', 'apartment_id', {
      type: Sequelize.INTEGER,
      references: { model: 'apartments', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('dwellers', 'apartment_id');
  },
};
