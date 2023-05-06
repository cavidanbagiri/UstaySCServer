
module.exports = (sequelize, DataTypes, Model) => {


    class SituationModel extends Model {};

    SituationModel.init({

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        situation : {
            type: DataTypes.STRING,
            allowNull : false
        }

    },{
        timestamps: false,
        createdAt:false,
        updatedAt:false,
        tableName:'situations',
        sequelize
    })

    return SituationModel;
}
