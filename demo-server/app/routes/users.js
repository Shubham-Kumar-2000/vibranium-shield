let express = require('express');
let router = express.Router();
let User = require('../models/user');
let auth = require('../middlewares/authenticate');
const {token} = require("morgan");
const crypto = require("crypto");
const e = require("express");

router.get('/', auth.verifyUser, (req, res, next) => {
  let email= req.query.email;
  let uid = req.body.id;
  let filter = {};

  if(email) filter = { email: email };
  if(uid) filter = { _id: uid };

  User.findOne(filter).then((user) => {
    return res.status(200).json(user);
  }).catch((err) => {
    return res.status(500).json(err);
  });

});

router.post('/register',  (req, res) => {
  let data = req.body;
  let saltHash = getSaltHash(data.password);

  let newUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    salt: saltHash.salt,
    hash: saltHash.hash
  }

  User.create(newUser).then((user) => {
    return res.status(200).json({msg: "success", user: user});
  }).catch((err) => {
    return res.status(500).json(err);
  });

});

router.post('/login', async (req, res) => {
  let data = req.body;
  try{
    let user = await User.findOne({email: data.email});
    console.log(user);
    if(!user){
      return res.status(400).json({err: "No user found"});
    }
    else if(validPassword(data.password, user) === false){
      return res.status(401).json({err: "Incorrect password"});
    }
    else {
      return res.status(200).json({user: user, token: auth.getToken(user.toJSON())});
    }
  }catch (error){
    console.log(error)
    return res.status(500).json(error);
  }
});


let getSaltHash = (password) => {
  let salt = crypto.randomBytes(16).toString('hex');
  let hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  return {salt, hash};
};

let validPassword = (password, user) => {
  let hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
  return user.hash === hash;
};

module.exports = router;
