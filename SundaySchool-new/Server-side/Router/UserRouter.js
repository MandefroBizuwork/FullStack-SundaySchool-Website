const express = require("express");
const router = express.Router();
//importing controlers
const { Login, Register, CheckUser,userReport,Deleteuser,Updateuser } = require("../Controler/UserControler");
//importing auth check middleware
const LoginAuth = require("../Auth/LoginAuth");

router.post("/login", Login);
router.post("/register", Register);
router.get("/checkuser", LoginAuth, CheckUser);
router.get("/userReport",userReport)
router.delete("/deleteuser/:username",Deleteuser)
router.put("/updateuser/:username",Updateuser)   
module.exports = router;
