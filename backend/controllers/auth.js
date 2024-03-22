const Customers = require("../models/customers");
const AdminAccount = require("../models/adminuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.registerAccount = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const error = new Error("Incomplete input.");
      error.statusCode = 422;
      throw error;
    }

    const exitsaccount = await Customers.findOne({ email: email });
    if (exitsaccount) {
      const error = new Error("Email Account already exists. please sign it.");
      error.statusCode = 409;
      throw error;
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = new Customers({
      full_name: name,
      email: email,
      hashedpassword: hashedPass,
    });
    const result = await user.save();

    if (result) {
      const isAdmin = false
      const token = generateToken(isAdmin, {
        _id: result.id,
        name: result.full_name,
        email: email,
      });
      res.status(200).json({
        message: "Successfully Registered." + token,
        userdata: {
          name: result.full_name,
          email,
          id: result._id,
        },
        token: token,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.loginAccount = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = new Error("Incomplete input.");
      error.statusCode = 422;
      throw error;
    }

    const checkuser = await Customers.findOne({ email: email });
    if (!checkuser) {
      const error = new Error("This account doesn't exists!");
      error.statusCode = 401;
      throw error;
    }

    const checkpass = await bcrypt.compare(password, checkuser.hashedpassword);
    if (!checkpass) {
      const error = new Error("Incorrect email or password.");
      error.statusCode = 401;
      throw error;
    }

    const isAdmin = false
    const token = generateToken(isAdmin, {
      _id: checkuser._id,
      name: checkuser.full_name,
      email: checkuser.email,
    });

    res.status(200).json({
      message: "Sucessful signed in",
      userdata: {
        name: checkuser.full_name,
        email,
        id: checkuser._id,
      },
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.adminLoginAccount = async (req, res, next) => {
  const { email, password } = req.body;

  const validationerror = validationResult(req);
  try {
    if (!validationerror.isEmpty()) {
      const error = new Error("Validation Failed, entered data is incorrect.");
      error.statusCode = 422;
      error.data = validationerror.array();
      next(error);
    }

    const checkExistsAdminAccount = await AdminAccount.findOne({
      email: email,
    });

    if (!checkExistsAdminAccount) {
      const error = new Error("This account doesn't exists!");
      error.statusCode = 401;
      throw error;
    }

    const checkAdminPassword = await bcrypt.compare(
      password,
      checkExistsAdminAccount.hashedpassword
    );
    if (!checkAdminPassword) {
      const error = new Error("Incorrect email or password.");
      error.statusCode = 401;
      throw error;
    }

    const isAdminProfile = true;

    const token = generateToken(isAdminProfile, {
      _id: checkExistsAdminAccount._id,
      email: checkExistsAdminAccount.email,
      isAdmin: checkExistsAdminAccount.isAdmin,
    });

    res.status(200).json({
      message: "Sucessful signed in",
      adminuserData: {
        email,
        id: checkExistsAdminAccount._id,
        isAdmin: checkExistsAdminAccount.isAdmin,
      },
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUserDetail = async (req, res, next) => {
  const { userid } = req.params;

  try {
    if (!userid) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const userdetail = await Customers.findById(userid).select(
      "full_name email createdAt status"
    );

    if (userdetail.length === 0) {
      const error = new Error("Couldn't find resource.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(userdetail);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const generateToken = (isAdminProfile, data) => {
  if (isAdminProfile) {
    return jwt.sign(data, process.env.ADMIN_JWT_TOKEN_SECRET_MESSAGE, {
      expiresIn: "24hr",
    });
  }
  return jwt.sign(data, process.env.JWT_TOKEN_SECRET_MESSAGE, {
    expiresIn: "24hr",
  });
};
