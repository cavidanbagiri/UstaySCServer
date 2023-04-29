
module.exports = (sequelize, DataTypes, Model) => {

    class WarehouseModel extends Model{};

    WarehouseModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        coming_date: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        delivery_date: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        }
    },{
        tableName:'warehouse',
        sequelize,
    })


    return WarehouseModel ;

}
