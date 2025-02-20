'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Favourite_Animals, { foreignKey: 'userId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    modelName: 'User',
  });
  return User;
};