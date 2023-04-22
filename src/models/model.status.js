
module.exports = (sequelize, DataTypes, Model) => {

    class StatusModel extends Model{};

    StatusModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName:'status',
        sequelize,
        createdAt: false,
        updatedAt: false
    })

    return StatusModel;

}
