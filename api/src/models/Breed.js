const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('breed', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },  
    name: { // nombre de raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    life_span: {
        type: DataTypes.INTEGER,
    }  
  });
};