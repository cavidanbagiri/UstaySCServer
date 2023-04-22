
module.exports = (sequelize, DataTypes, Model) => {

    class FieldsModel extends Model{};

    FieldsModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        field_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName:'fields',
        sequelize,
    })

    return FieldsModel;

}
