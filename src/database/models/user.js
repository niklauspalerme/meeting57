/////////////////////////////////////////////////////////////
// Variables Iniciales

const {DataTypes } = require('sequelize');


/////////////////////////////////////////////////////////////
// Función 


const createUserModel = (connection) =>{

    const User = connection.define('User', {
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
        modelName: 'User',
        tableName: 'User'
      });
      return User;
}


/////////////////////////////////////////////////////////////
// Variables Iniciales


module.exports={
    createUserModel
}