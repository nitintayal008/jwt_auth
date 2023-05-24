const Router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //lets validate the schema
  console.log("working");
  console.log(req.body);
  if (error) {
    // console.log(error.details[0].message);
    return res.status(400).send({ err: error.details[0].message });
  }
  const newUser = new User({
    name: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log("successfully registered!");
    res.status(200).redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
