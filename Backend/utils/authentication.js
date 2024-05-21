const jwt = require("jsonwebtoken");
const User = require("../Models/User");

function authorize(role) {
  return async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
      const decoded = jwt.verify(token, "LoginSecretKey");

      // Fetch user information from the database based on the decoded token
      const user = await User.findOne({ _id: decoded.id });
      console.log("user", user);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        id: user._id,
        role: user.role,
      };

      if (user.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = authorize;
