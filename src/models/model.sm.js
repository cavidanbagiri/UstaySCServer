const moment = require('moment');

module.exports = (sequelize, DataTypes, Model) => {

    class SMModel extends Model{};

    SMModel.init({
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sm_num : {
            type: DataTypes.STRING,
            allowNull: true,
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
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            //defaultValue: moment(new Date()).format('YYYY-MM-DD'),
            allowNull: false,
        },
    },{
        tableName:'sms',
        sequelize,
    })



    return SMModel;

}
