module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('apartments', 'block_id', {
      type: Sequelize.INTEGER,
      references: { model: 'blocks', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('apartments', 'block_id');
  },
};
