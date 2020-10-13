const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const app = express();

app.set('view engine', 'ejs');


router.post("/register", (req, res) => {
  //form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  //check valdidation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user => {
    if(user) {
      return res.status(400).json({email: "Email already exists"});
    } else {
      const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });

      //hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });
});



router.post("/login", (req, res) => {

  //form valdidation
  const { errors, isValid } = validateLoginInput(req.body);

  //check valdidation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find email from db
  User.findOne({ email }).then(user => {
    if(!user) {
      return res.status(404).json({emailnotfound: "Email not found"});
    }

    //checking password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        //user found
        //create JWT payload
        const payload = {
          id: user.id,
          name: user.name
        };

        //signing token
        jwt.sign(payload, keys.secretOrKey,{expiresIn:31556926},
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect"});
      }
    });
  });

});

router.get("/dashboard", (req, res) => {

  User.find({}, (err, allUsers) => {
    res.json(allUsers);
  });
  res.render("../.././client/src/components/dashboard/Dashboard", {
    allUsers: allUsers
  });
});



module.exports = router;
