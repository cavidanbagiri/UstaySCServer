
module.exports = (sequelize, DataTypes, Model) => {


    class SMSNums extends Model{};

    SMSNums.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        smnum:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'smsnums',
        sequelize
    })

    return SMSNums;

}
