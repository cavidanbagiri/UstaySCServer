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
  },
  dbConfig.TIMEZONE
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
const STFModel = require('../models/model.stf');
const VendorModel = require('../models/model.vendor');
const StatusModel = require('../models/model.status');
const FieldsModel = require('../models/model.fields');

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
db.STFModel = STFModel(sequelize, DataTypes, Model);
db.VendorModel = VendorModel(sequelize, DataTypes, Model);
db.StatusModel = StatusModel(sequelize, DataTypes, Model);
db.FieldsModel = FieldsModel(sequelize, DataTypes, Model);

/**************************************** Create a Relationship **************/

// User Model Relationship
db.ProjectModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.ProjectModel);
db.DepartmentModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.DepartmentModel);
db.DepartmentModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.DepartmentModel);
db.StatusModel.hasMany(db.UserModel);
db.UserModel.belongsTo(db.StatusModel);

// Field Model Relationship
db.ProjectModel.hasMany(db.FieldsModel);
db.FieldsModel.belongsTo(db.ProjectModel);

// MTF Model Relationship
db.ProjectModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.ProjectModel);
db.UserModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.UserModel);
db.DepartmentModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.DepartmentModel);
db.FieldsModel.hasMany(db.MTFModel);
db.MTFModel.belongsTo(db.FieldsModel);

// STF Model Relationship
db.ProjectModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.ProjectModel);
db.DepartmentModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.DepartmentModel);
db.VendorModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.VendorModel);
db.MTFModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.MTFModel);
db.UserModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.UserModel);


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