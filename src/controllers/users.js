const path = require("path");
const db = require('../models');
const jwt = require('jsonwebtoken');

const Users = db.users;

const userValidate = async(req, res) => {
   // console.log(req)
    const user = await Users.findOne({
        where:{
            email:req.body.email
        }
    });
try{
    if(user && user.password === req.body.password){ 
        const email = user.email;
        const token = await jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
        user.token = token;
        return res.status(200).json({error:false,user:user,token:token,valid:true})
    }
    else{
        return res.status(400).json({error:false,user:user,valid:false});
    }    
  } catch(err){
    res.status(400).json({error:true,msg:err,valid:false});
  }
};

module.exports = {
  userValidate: userValidate,
};
