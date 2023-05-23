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
  dbConfig.timezone
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
const STFModel = require("./model.stf");
const SMModel = require('./model.sm');
const VendorModel = require('../models/model.vendor');
const StatusModel = require('../models/model.status');
const FieldsModel = require('../models/model.fields');
const ConditionModel = require('../models/model.condition');
const WarehouseModel = require('../models/model.warehouse');
const DeliveryTypeModel = require('../models/model.delivery_type');
const SituationModel = require('../models/model.situation');
const STFSNumsModel = require('../models/model.stfsnums');
const SMSNumsModel = require('../models/model.smsnums');
const WorkManagementModel = require('../models/model.workmanagements');

// Create an empty Object
const db = {};

// Create Sequelize Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Create Model Instance
db.ProjectModel = ProjectModel(sequelize, DataTypes, Model);
db.DepartmentModel = DepartmentModel(sequelize, DataTypes, Model);
db.UserModel = UserModel(sequelize, DataTypes, Model);
db.STFModel = STFModel(sequelize, DataTypes, Model);
db.SMModel = SMModel(sequelize, DataTypes, Model);
db.VendorModel = VendorModel(sequelize, DataTypes, Model);
db.StatusModel = StatusModel(sequelize, DataTypes, Model);
db.FieldsModel = FieldsModel(sequelize, DataTypes, Model);
db.ConditionModel = ConditionModel(sequelize, DataTypes, Model);
db.WarehouseModel = WarehouseModel(sequelize, DataTypes, Model);
db.DeliveryTypeModel = DeliveryTypeModel(sequelize, DataTypes, Model);
db.SituationModel = SituationModel(sequelize, DataTypes, Model);
db.STFSNumsModel = STFSNumsModel(sequelize, DataTypes, Model);
db.SMSNumsModel = SMSNumsModel(sequelize, DataTypes, Model);
db.WorkManagementModel = WorkManagementModel(sequelize, DataTypes, Model);

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

// STF Model Relationship
db.ProjectModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.ProjectModel);
db.UserModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.UserModel);
db.DepartmentModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.DepartmentModel);
db.FieldsModel.hasMany(db.STFModel);
db.STFModel.belongsTo(db.FieldsModel);


// SM Model Relationship
db.ProjectModel.hasMany(db.SMModel);
db.SMModel.belongsTo(db.ProjectModel);
db.DepartmentModel.hasMany(db.SMModel);
db.SMModel.belongsTo(db.DepartmentModel);
db.VendorModel.hasMany(db.SMModel);
db.SMModel.belongsTo(db.VendorModel);
db.STFModel.hasMany(db.SMModel);
db.SMModel.belongsTo(db.STFModel);
db.UserModel.hasMany(db.SMModel,{
  foreignKey: 'supplierName'
});
db.SMModel.belongsTo(db.UserModel);

// Condition Model
db.SituationModel.hasMany(db.ConditionModel);
db.ConditionModel.belongsTo(db.SituationModel);

db.STFModel.hasMany(db.ConditionModel);
db.ConditionModel.belongsTo(db.STFModel);
db.ProjectModel.hasMany(db.ConditionModel);
db.ConditionModel.belongsTo(db.ProjectModel);

// Warehouse Model
db.SMModel.hasMany(db.WarehouseModel);
db.WarehouseModel.belongsTo(db.SMModel);

db.UserModel.hasMany(db.WarehouseModel,{
  foreignKey: 'acceptedBy'
});
db.WarehouseModel.belongsTo(db.UserModel);

db.ProjectModel.hasMany(db.WarehouseModel);
db.WarehouseModel.belongsTo(db.ProjectModel);


// Work Management Model
db.UserModel.hasMany(db.WorkManagementModel);
db.WorkManagementModel.belongsTo(db.UserModel);

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