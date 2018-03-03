'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    salt: {
      type: DataTypes.TEXT,
      required: true
    },
    passwordHash: {
      type: DataTypes.TEXT,
      required: true
    },
    isAdmin: DataTypes.BOOLEAN,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (password) {
        this._plainPassword = password;
        if (password) {
          this.salt = crypto.randomBytes(128).toString('base64');
          this.passwordHash = (crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')).toString();
        } else {
          this.salt = undefined;
          this.passwordHash = undefined;
        }
      },
      get: function () {
        return this._plainPassword;
      }
    }
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo, {
      foreignKey: 'todoId',
      as: 'todos',
    })

  };
  User.prototype.checkPassword = function (password) {
    console.log('check pass', password);
    if (!password) {
      console.error(new Error(`Empty password`));
      return false;
    }
    if (!this.passwordHash) {
      console.error(new Error(`Empty passwordHash`));
      return false;
    }
    const hash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    const pwdMatch = hash.toString() === this.passwordHash;
    if (!pwdMatch) {
      console.error('wrong password');
    }
    return pwdMatch;
  };

  return User;
};

