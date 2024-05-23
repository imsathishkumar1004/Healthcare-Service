const jwt = require("jsonwebtoken");
require('dotenv').config();
const auth = (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];
    console.log(process.env.JWT_SECRET);
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    req.locals = verifyToken.userId;
    next();
  } catch (error) {
    console.log("this",error,verifyToken);

    return error;
  }
};

module.exports = auth;
