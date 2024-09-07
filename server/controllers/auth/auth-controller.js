import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

//register
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashedPassword = bcrypt.hashSync("password", 10);
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    console.log(newUser);
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }
    const validPassword = await bcrypt.compareSync(
      "password",
      validUser.password
    );
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        role: validUser.role,
        email: validUser.email,
        userName:validUser.userName
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token",token,{httpOny:true,secure:false}).json({
      success: true,
      message: "User logged in successfully",
      user:{
        email:validUser.email,
        role:validUser.role,
        id:validUser._id,
        userName:validUser.userName
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};


//logout
export const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "User logged out successfully",
  })
}

//authMiddleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    })
  }
  try {
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    })
  }
}