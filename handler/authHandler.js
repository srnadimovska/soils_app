const User = require("../pkg/model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please enter email or password!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid password or email!");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password or email!");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 10000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      token,
    });

  } catch (err) {
    res.status(500).json({
      status: 'fail',
      err: err.message,
    });
  }
};

// exports.protect = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization) {
//       token = req.headers.authorization.split(' ')[1];
//     }
//     if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }

//     if (!token) {
//       return res.status(500).send('You are not logged in! please log in');
//     }

    

//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//     const userTrue = await User.findById(decoded.id);
//     if (!userTrue) {
//       return res.status(401).send('User does not longer exist!');
//     }

//     req.auth = userTrue;

//     next();
//   } catch (err) {
//     res.status(500).json({
//       status: 'fail',
//       err: err.message,
//     });
//   }
// };