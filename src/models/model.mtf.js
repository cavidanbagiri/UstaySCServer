const moment = require('moment');

module.exports = (sequelize, DataTypes, Model) => {

    class MTFModel extends Model{}
    const queryInterface = sequelize.getQueryInterface();
    MTFModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mtf_num:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        material_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        count: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_status: {
            type: DataTypes.STRING,
            defaultValue:'Normally',
            allowNull:true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            defaultValue: moment(new Date()).format('YYYY-MM-DD'),
        },
    },{
        tableName:'mtfs',
        sequelize,
    })
    
    // queryInterface.removeColumn('mtfs','cond');

    return MTFModel;

}
