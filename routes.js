const express =require('express');
const router = express.Router();
const { sequelize, User, Course} =require('./models');
const bcrypt =require('bcrypt');
const asyncHandler=(cb)=>
{
    return async (req,res,next) =>
    {
        try{
            await cb(req,res,next);
        }
        catch(err)
        {
            next(err);
        }
    }
}

//return currently authenicated user with 200 HTPP status code
router.get('/users', asyncHandler( async (req,res)=>{
    let users= await User.findAll();
    res.status(200).json(users);
}));

//Creat a new user return 201 status code, set location header to "/"
router.post('/users', asyncHandler( async (req,res) =>
{
    
    try {
        const errors=[];
        console.log(req.body);
        const user =req.body;
        if(!user.firstName)
        {
            errors.push("Please provide a firstName")
        }

        if(!user.lastName)
        {
            errors.push("Please provide a lastName")
        }
        if(!user.emailAddress)
        {
            errors.push("Please an Email Address")
        }

        let password =user.password;
        if(!password)
        {
            errors.push("Please enter a password for the account.")
        }
        else
        {user.password =bcrypt.hashSync(password,10);}

        if(errors.length > 0)
        {
            res.status(400).json({errors});
        }
        else
       { await User.create(user);
        res.redirect(201,'/');}

    }
    catch(error)
    {
        console.log('Error' , error.name);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError')
        {
            const errors = error.errors.map( err => err.message);
            res.status(400).json({errors});   
        }

        else{
            throw error;
        }
    }
    
} ))


//Return a list of all courses and the user that owns each course and 200 status
router.get('/courses', asyncHandler( async (req,res)=>
{
    let courses = await Course.findAll({
        include:[
            {
                model:User, 
            }
        ]
    });
    res.status(200).json(courses);
}));

//Returns a single course and the user it belongs to 
router.get('/courses/:id', asyncHandler( async (req, res) =>
{
    let course = await Course.findByPk(req.params.id, {include:User});
    res.status(200).json(course);

}) );

// Creates a new course
router.post('/courses');

//Update the course with the id
router.put('/courses/:id');

//Delete the course witht this id
router.delete('/courses/:id');

module.exports = router;