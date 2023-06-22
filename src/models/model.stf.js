const moment = require('moment');

module.exports = (sequelize, DataTypes, Model) => {

    class STFModel extends Model{}
    // const queryInterface = sequelize.getQueryInterface();
    STFModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        stf_num:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        material_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        material_name: {
            type: DataTypes.STRING(1234),
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
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).format('YYYY-MM-DD HH:mm:ss');
            }
        },
    },{
        tableName:'stfs',
        sequelize,
    })
    

    return STFModel;

}
