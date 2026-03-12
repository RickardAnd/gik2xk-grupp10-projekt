'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Lägger till relationerna mellan tabellerna
// En user kan ha många kundkorgar.
db.cart.belongsTo(db.users, { foreignKey: {allowNull: false } });
db.users.hasMany(db.cart, {
  allowNull: false,
  onDelete: "CASCADE"
});

// En produkt kan ha många ratings
db.ratings.belongsTo(db.products);
db.products.hasMany(db.ratings, {
  allowNull: false,
  onDelete: "CASCADE"
});

// Många till många mellan cart och product.
db.products.belongsToMany(db.cart, { through: db.cart_row});
db.cart.belongsToMany(db.products, { through: db.cart_row});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
