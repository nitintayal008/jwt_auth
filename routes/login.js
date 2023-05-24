const Router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//login for the user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Crentials!!");
    // console.log(user);

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      "nitintayalsecret"
    );
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (password != req.body.password) {
      res.status(401).send({ message: "wrong credentials" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "jwtsecretkey",
      { expiresIn: "3d" }
    );
    user.password = undefined;

    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
