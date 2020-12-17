'use strict'

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const {User} = require('../models');

exports.authenticateUser= async(req, res, next) =>
{
    let message ;

    const  credentials = auth(req);
    console.log(credentials);

    if(credentials)
    {
        const user =await User.findOne({where : {emailAddress: credentials.name}});
        if(user)
        {
            const authenticated =bcrypt.compareSync(credentials.pass,user.password);

            if(authenticated)
            {
                console.log(`Authentication successful for : ${user.firstName} `);

                req.currentUser = user;
            }
            else{
                message =`Authentication failure for ${user.firstName}`;
            }
        }
        else{
            message =`User not fount for email: ${credentials.name}`;
        }

    }
    else{
        message =`Auth header not found`;
    }

    if(message)
    {
        console.warn(message);
        res.status(401).json({message:'Access Denied'})
    }
    else{
        next();
    }

    
};