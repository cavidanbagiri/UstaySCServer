
module.exports = (sequelize, DataTypes, Model) => {

    class DepartmentModel extends Model{};

    DepartmentModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        tableName: 'departments',
        sequelize
    });

    return DepartmentModel;

}
