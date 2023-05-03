
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
        },
        doc_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        doc_date: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        passport: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        certificate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },{
        tableName:'warehouse',
        sequelize,
    })


    return WarehouseModel ;

}
