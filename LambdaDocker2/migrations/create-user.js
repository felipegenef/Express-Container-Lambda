module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "users",
          {
            id: {
              type: Sequelize.DataTypes.UUID,
              primaryKey: true,
              defaultValue: Sequelize.DataTypes.UUIDV4,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("users", { transaction: t }),
      ]);
    });
  },
};
