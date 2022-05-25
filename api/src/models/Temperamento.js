const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('temperamento', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },  
    nombre: { // nombre del temperamento
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};