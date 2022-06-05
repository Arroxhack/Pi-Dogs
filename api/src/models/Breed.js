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
    min_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    max_weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    life_span: {
        type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    }  
  });
};