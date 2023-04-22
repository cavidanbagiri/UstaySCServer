
module.exports = (sequelize, DataTypes, Model) => {

    class VendorModel extends Model{};

    VendorModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendor_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName:'vendors',
        sequelize,
    })

    return VendorModel;

}
