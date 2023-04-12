
module.exports = (sequelize, DataTypes, Model) => {

    class MTFModel extends Model{}

    MTFModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mtf_num:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        material_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_name_other: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        field: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        tableName:'mtfs',
        sequelize
    })


    return MTFModel;

}
