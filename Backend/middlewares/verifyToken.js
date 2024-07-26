const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{

  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]

  if(!token)
    return res.status(401).json({success:false, message: "Unauthorized"});

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) =>{
      if(err)
        return res.status(403).json({success: false, message: "Forbidden"})

      req.id = user.id;
      req.author = user.author;
      req.accountType = user.accountType;

      next()
    })
    
  } catch (error) {
    return res
      .status(500)
      .json({ success:false, message: "Internal server Error"})
  }

}


//Bearer jbfuo34uitgh344354
//We have to split -> " "
//["Bearer", "jbfuo34uitgh344354"]
//[1]