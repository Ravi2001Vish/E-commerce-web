import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;

      let decodeToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      if (decodeToken) {
        next();
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.massasge });
  }
};
export default auth;
