
module.exports = (sequelize, DataTypes, Model) => {


    class STFSNums extends Model{};

    STFSNums.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stfnum:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'stfsnums',
        sequelize
    })

    return STFSNums;

}
