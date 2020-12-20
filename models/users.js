'use strict'

const Sequelize = require('sequelize');



module.exports=(sequelize) =>
{
    class User extends Sequelize.Model{}
    User.init(
        {
            firstName:{type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notNull:{
                        msg:"A firstName is required."
                },
                notEmpty:{
                    msg:"You must include a firstName."
                }
            }
    },
            
            lastName:{type: Sequelize.STRING,
            allowNull: false,
            validate:
            {
                notNull:{
                    msg:"A lastName is required."
                },
                notEmpty:{
                    msg:"You must include a lastName."
                }
            }

            
            },
            emailAddress:{type: Sequelize.STRING,
            allowNull:false,
            unique:{msg:  "The email address already exists, please include a unique email address"},
            validate:
            {
                notNull:{
                    msg:"An emailAddress is required."
                },
                
                isEmail:{
                    msg:"You must provide a valid emailaddress."
                }

            }

            },
            password:{type: Sequelize.STRING,
                allowNull:false,
                validate:
                {
                    notNull:{
                        msg:"A password is required"

                    },
                    notEmpty:{
                        msg:"You must include a password."

                    },
              
                }
            },
         
        },{sequelize}
    );

    User.associate=(models)=>
    {
        User.hasMany(models.Course,
            {
                foreignKey:{
                    fieldName:'userId',
                    allowNull:false
                }
            })
    };

    return User;
}