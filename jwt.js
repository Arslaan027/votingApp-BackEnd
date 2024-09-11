const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //==> first check request header have Authorisation or not;
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).send("Unauthorized");
  //==> Extracting the jwt token from Req Header
  const token = req.headers.authorization.split(" ")[1];
  //==> if token not found
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  try {
    //==> Verifing the jwt Token and storing the id in decoded payload
    const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
    //==> Sending the decoded payload to the server
    req.user = decodedPayload;
    next();
  } catch (error) {
    console.log(error);
    return res.staus(500).send({ msg: "Error in token Varification" });
  }
};
//==> userData = payload
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.SECRET_KEY);
};

module.exports = { jwtAuthMiddleware, generateToken };
