import { User } from "../models/user.modal.js";
import bcrypt from "bcrypt";
import genrateAccessToken from "../utils/generateAccessToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, phone_number, password,role } = req.body;
    if (!name || !email || !phone_number || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const validRoles = ["admin", "mentor", "learner"];
    const userRole = validRoles.includes(role) ? role : "learner";

    const user = new User({
      name,
      email,
      phone_number,
      password: hashedPassword,
      role: userRole,
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || error, success: true, error: false });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const accessToken = await genrateAccessToken(user._id);
    return res.status(200).json({
      message: "Login successful",
      user: user,
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      success: true,
      error: false,
    });
  }
};

// logout

// export const Logout = async (req, res) => {
//   try {

//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       success: true,
//       error: false,
//     });
//   }
// };

export const UserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Profile fetched successfully",
      user: user,
    });

    // const user = await User.findById(req.user._id).select("-password");
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: true,
      error: false,
    });
  }
};
