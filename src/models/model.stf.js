const moment = require('moment');

module.exports = (sequelize, DataTypes, Model) => {

    class STFModel extends Model{};

    STFModel.init({
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        procurement_coming_date : {
            type: DataTypes.DATEONLY,
        },
        price : {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        total : {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        currency : {
            type: DataTypes.CHAR(6),
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            defaultValue: moment(new Date()).format('YYYY-MM-DD'),
        },
    },{
        tableName:'stfs',
        sequelize,
    })



    return STFModel;

}
