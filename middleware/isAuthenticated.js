import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];
    //   console.log(token,"lllllpppppppppppppp")
    if (!token) {
      return res.status(401).json({
        message: "user is not authenticated",
        success: false,
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_ACCESS_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
