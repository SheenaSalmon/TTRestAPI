'use strict'

const Sequelize = require('sequelize');
const bcrypt =require('bcrypt');


module.exports=(sequelize) =>
{
    class User extends Sequelize.Model{}
    User.init(
        {
            firstName:{type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notNull:{
                        msg:"A firstName is required"
                },
                notEmpty:{
                    msg:"You must include a firstName"
                }
            }
    },
            
            lastName:{type: Sequelize.STRING,
            allowNull: false,
            validate:
            {
                notNull:{
                    msg:"A lastName is required"
                },
                notEmpty:{
                    msg:"You must include a lastName"
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
            // confirmedPassword:{
            //     type: Sequelize.STRING,
            //     allowNull: false,
            //     set(val)
            //     {
            //         if(val=== this.password)
            //         {
            //             const hashedPassword = bcrypt.hashSync(val,10);
            //             this.setDataValue('confirmedPassword', hashedPassword);
            //         }
            //     },
            //     validate:
            //     {
            //         notNull:{
            //             msg: "The passwords do not match.  Please try again."
            //         }
            //     }
            // }
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