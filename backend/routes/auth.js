const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt= require('bcryptjs');
const jwt =require('jsonwebtoken');
const fetchuser= require("../middleware/fetchuser")

const jwt_secret="yohohooooo$$";
//ROUTE-1: creating user
router.post(
  "/createuser",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const data={
        user:{
            id: user.id
        }
      }
      const authtoken=jwt.sign(data, jwt_secret);
      success=true
      res.status(201).json({success, authtoken });
    }catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }    
  }
);

// ROUTE-2: login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("password can't be blank")
  ],
  async (req, res) => {
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email, password}=req.body;
    try {
      const user=await User.findOne({email});
      if(!user){
        success=false
        return req.status(400).json({error: "Enter the correct credentials"})
      }
      const compPassword=await bcrypt.compare(password, user.password);
      if(!compPassword){
        success=false
        return req.status(400).json({success, error: "Enter the correct credentials"})
      }
      const data={
        user:{
            id: user.id
        }
      }
      const authtoken=jwt.sign(data, jwt_secret);
      success=true
      res.json({success, authtoken});
    } catch (error) {
      console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  })
  //ROUTE-3: GET USER DETAILS. 
  router.post(
    "/getuser", fetchuser, async (req, res) => {
    
      try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
      }
    })
module.exports = router;