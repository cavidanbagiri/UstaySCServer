
module.exports = (sequelize, DataTypes, Model) => {

    class WarehouseModel extends Model{};

    WarehouseModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        delivery_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        delivery_date: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        doc_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        doc_date: {
            allowNull: true,
            type: DataTypes.DATE,
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
