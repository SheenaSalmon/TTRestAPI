'use strict'

const auth = require('basic-auth');
const {User} = require('../models');

extports.authenticateUser=async  (req, res, next) =>

{

    const  credentials = auth(req);

    if(credentials)
    {
        const user =await User.findOne({where : {emailAddress: credentials.name}});
    }

    next();
}