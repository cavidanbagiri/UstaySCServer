
module.exports = (sequelize, DataTypes, Model) => {

    class ConditionModel extends Model{};

    ConditionModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    },{
        tableName:'conditions',
        sequelize,
    })

    return ConditionModel;

}

