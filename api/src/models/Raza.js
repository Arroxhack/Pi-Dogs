const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('raza', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },  
    nombre: { // nombre de raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    añosDeVida: {
        type: DataTypes.STRING,
        allowNull: false,
    }  
  });
};