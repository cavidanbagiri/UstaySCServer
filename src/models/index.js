const { Sequelize, DataTypes, Model } = require("sequelize");

const dbConfig = require("../config/config");

// Configuration Database
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

// Create Connection
(createConnection = async () => {
  try {
    await sequelize
      .authenticate()
      .then((_) => {
        console.log("Connection Created");
      })
      .catch((err) => {
        console.log("Create Connection Failed from authenticate");
      });
  } catch (err) {
    console.log("Create Connection Failed");
  }
})();

// Create an empty Object
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync Database
db.sequelize
  .sync({ force: false })
  .then((_) => {
    console.log("Sync Database");
  })
  .catch((err) => {
    console.log("Sync Database Error : ", err);
  });
