const Sequelize =require('sequelize');


module.exports=(sequelize) =>{

    class Course extends Sequelize.Model{}

    Course.init({
        title:Sequelize.STRING,
        description:Sequelize.TEXT,
        estimatedTime: Sequelize.STRING,
        materialsNeeded: Sequelize.STRING,
        userId:Sequelize.INTEGER

    },{sequelize});

    Course.associate =(models) =>
    {
      Course.belongsTo(models.User,
        {
            foreignKey:{
                fieldName:'userId',
                allowNull:false ,         
            },
        }); 
    };



return Course;
};