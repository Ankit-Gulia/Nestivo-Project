const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isAsync } = require('../Schema');


module.exports.signup = async(req,res,next) => {
    let {full_name, email, phone, password} = req.body;
    userModel.findOne({email}).then(user => {
      if(user) return res.status(400).json({message: "User with given email already exists"});
    }).catch(err => res.status(500).json({message: "Error checking user existence", error: err}));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({full_name, email, phone, password: hashedPassword});
    const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie('token', token);
    res.json({message : `User created successfully`, user:newUser});
};

module.exports.login = (req,res) => {
  const {email, password} = req.body; 

  userModel.findOne({email}).then((user) => {
    if(!user) return res.status(404).json({message: "User not found"});

    bcrypt.compare(password, user.password).then(isMatch => {
      if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

      const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '7d'});

      res.cookie('token', token).json({message: "Login successful", user});
    }).catch(err => res.status(500).json({message: "Error comparing passwords", error: err}));

  }).catch(err => res.status(500).json({message: "Error finding user", error: err})); 
}

module.exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.json({message: "Logout successful"});
};

module.exports.isUserAuthenticate = async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({message: "Not authenticated"});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    res.json({user, isAuthenticated: true});
  } catch (err) {
    res.status(401).json({message: "Invalid token", isAuthenticated: false});
  }
}
