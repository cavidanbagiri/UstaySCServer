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

// Import Models
const ProjectModel = require("../models/model.project");
const DepartmentModel = require("../models/model.department");
const UserModel = require("../models/model.user");
const MTFModel = require("../models/model.mtf");

// Create an empty Object
const db = {};

// Create Sequelize Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Create Model Instance
db.ProjectModel = ProjectModel(sequelize, DataTypes, Model);
db.DepartmentModel = DepartmentModel(sequelize, DataTypes, Model);
db.UserModel = UserModel(sequelize, DataTypes, Model);
db.MTFModel = MTFModel(sequelize, DataTypes, Model);

/**************************************** Create a Relationship **************/

// User Model Relationship
db.ProjectModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.ProjectModel);
db.DepartmentModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.DepartmentModel);

// MTF Model Relationship
db.ProjectModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.ProjectModel);
db.UserModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.UserModel);
db.DepartmentModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.DepartmentModel);

// Sync Database
// db.sequelize
//   .sync({ force: false })
//   .then((_) => {
//     console.log("Sync Database");
//   })
//   .catch((err) => {
//     console.log("Sync Database Error : ", err);
//   });


module.exports = db;