
module.exports = (sequelize, DataTypes, Model) =>{

    class ProjectModel extends Model{};

    ProjectModel.init({

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        tableName: 'projects',
        sequelize
    })

    return ProjectModel;

}
