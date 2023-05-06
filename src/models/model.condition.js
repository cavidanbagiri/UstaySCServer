
module.exports = (sequelize, DataTypes, Model) => {

    class ConditionModel extends Model{};

    ConditionModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },{
        tableName:'conditions',
        sequelize,
    })

    return ConditionModel;

}

