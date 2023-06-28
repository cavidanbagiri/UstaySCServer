
module.exports = (sequelize, DataTypes, Model) => {

    class SMStatusModel extends Model{};

    SMStatusModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderer_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        receiving_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        left_over: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName : 'smstatusmodel'
    })

    return SMStatusModel;

}
