
module.exports = (sequelize, DataTypes, Model) => {

    class DeliveryTypeModel extends Model{};

    DeliveryTypeModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        deliveryType: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{
        tableName:'deliverytypes',
        sequelize,
        timestamps: 'false',
        createdAt: 'false',
        updatedAt: 'false'
    })


    return DeliveryTypeModel ;

}
