const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const internalErrorResponse = require("../utils/internalErrorResponse");
const UsersModel = require("../../models/Users.model");

class UsersController {
  // * set denied request
  denyRequest = async (req, res) => {
    try {
      const dr = await UsersModel.updateOne(
        {
          _id: req.params.id,
          onWaitList: {
            $elemMatch: { listingId: req.body.listingId },
          },
        },
        {
          $set: { "onWaitList.$.accepted": false, "onWaitList.$.denied": true },
        },
        { new: true }
      );

      if (dr)
        return res.status(200).json({
          success: true,
          message: "Denied reservation.",
          waitList: dr.waitList,
        });
      else
        return res.status(400).json({
          success: true,
          message: "Denied reservation failed.",
          waitList: dr?.waitList,
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * set accepted on wait list
  acceptWaitList = async (req, res) => {
    try {
      const awl = await UsersModel.updateOne(
        {
          _id: req.params.id,
          onWaitList: {
            $elemMatch: { listingId: req.body.listingId },
          },
        },
        {
          $set: { "onWaitList.$.accepted": true, "onWaitList.$.denied": false },
        },
        { new: true }
      );

      // console.log(awl);

      if (awl)
        return res.status(200).json({
          success: true,
          message: "Accepted reservation.",
          user: awl,
        });
      else
        return res.status(400).json({
          success: true,
          message: "Accept reservation failed. (renter side)",
          user: awl,
        });
    } catch (error) {
      console.log(error);
      internalErrorResponse(res, error);
    }
  };
  // * set onWaitList
  setOnWaitList = async (req, res) => {
    try {
      const user = await UsersModel.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: {
            onWaitList: {
              ...req.body,
              createdAt: Date.now(),
            },
          },
        },
        { new: true }
      );

      if (user) {
        return res.status(200).json({
          success: true,
          message: "Updated user.",
          user,
        });
      } else
        return res.status(400).json({
          success: true,
          message: "Update user failed.",
          user,
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * set owner
  setIsOwner = (req, res) => {
    UsersModel.findOneAndUpdate({ _id: req.userId }, req.body, {
      new: true,
    }).then((user) =>
      user
        ? res.status(200).json({
            success: true,
            message: "Updated user.",
            user,
          })
        : res
            .status(400)
            .json({
              success: true,
              message: "Update user failed.",
              user,
            })
            .catch((error) => internalErrorResponse(res, error))
    );
  };
  //* update user
  update = (req, res) => {
    UsersModel.findOneAndUpdate({ _id: req.userId }, req.body, {
      new: true,
    }).then((user) =>
      user
        ? res.status(200).json({
            success: true,
            message: "Updated user.",
            user,
          })
        : res
            .status(400)
            .json({
              success: true,
              message: "Update user failed.",
              user,
            })
            .catch((error) => internalErrorResponse(res, error))
    );
  };
  // * find user
  findUser = async (req, res) => {
    try {
      const findUser = await UsersModel.findById(req.params.id).select(
        "_id name phone email isOwner createdAt ethAddress"
      );

      if (findUser) {
        return res.status(200).json({
          success: true,
          message: "Found user.",
          user: findUser,
        });
      } else {
        return res.status(404).json({
          success: true,
          message: "Not found user.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  //* sign up
  signUp = async (req, res) => {
    try {
      const { email, name, phone, password } = req.body;

      const findUser = await UsersModel.findOne({ email });
      if (findUser) {
        return res.status(400).json({
          success: false,
          message: "Existed email.",
        });
      }
      // hash password
      const hashedPassword = await argon2.hash(password);
      // create user
      const newUser = new UsersModel({
        email,
        name,
        phone,
        password: hashedPassword,
        isOwner: false,
      });
      await newUser.save();
      // create token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );

      return res.status(200).json({
        success: true,
        message: "User created successfully.",
        accessToken,
        user: newUser,
      });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * log in
  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await UsersModel.findOne({
        email,
      });
      // verify info
      let verifyPassword;
      if (findUser)
        verifyPassword = await argon2.verify(findUser.password, password);
      // wrong information
      if (!findUser || !verifyPassword)
        return res.status(400).json({
          success: false,
          message: "Incorrect email/password.",
        });
      // create token
      const accessToken = jwt.sign(
        { userId: findUser._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );

      return res.status(200).json({
        success: true,
        message: "Logged in successfully.",
        accessToken,
        user: findUser,
      });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  getMyInfo = async (req, res) => {
    try {
      const gmi = await UsersModel.findById(req.userId);

      if (gmi) {
        return res.status(200).json({
          success: true,
          message: "Get my info successfully.",
          user: gmi,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Get my info failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
}

module.exports = new UsersController();
