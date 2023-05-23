
const moment = require('moment');

module.exports = (sequelize, DataTypes, Model) => {

    class WorkManagementModel extends Model{};

    WorkManagementModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        condition: {
            type: DataTypes.ENUM('Attached','Working','Competed'),
            allowNull: false,
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            defaultValue: moment(new Date()).format('YYYY-MM-DD'),
        },
        setting_at: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },

    },{
        tableName:'workmanagements',
        sequelize, 
    })

    return WorkManagementModel;

}
