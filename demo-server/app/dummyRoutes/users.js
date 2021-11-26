let express = require('express');
let router = express.Router();
let User = require('../models/user');
let auth = require('../middlewares/authenticate');
const {token} = require("morgan");
const crypto = require("crypto");
const e = require("express");

/* GET users listing. */
router.get('/', (req, res, next) => {

  return res.status(200).json({
    name: "Nem",
    email: "nem@123.com"
  });

});

router.get('/1', (req, res, next) => {

  return res.status(200).json({
    name: "Nem",
    email: "nem@123.com"
  });

});

router.post('/register',  (req, res) => {
  let data = req.body;

  let newUser = {
    name: data.name,
    email: data.email,
  }
  return res.status(200).json({msg: "success", user: newUser});
});

router.post('/login', async (req, res) => {
  let data = req.body;
  try{
      let user = {
        name: data.name,
        email: data.email,
      }
      return res.status(200).json({user: user, token: auth.getToken(user.toJSON())});
  }catch (error){
    return res.status(500).json(error);
  }
});


module.exports = router;
