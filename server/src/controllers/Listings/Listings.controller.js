const internalErrorResponse = require("../utils/internalErrorResponse");
const ListingsModel = require("../../models/Listings.model");
const { default: mongoose } = require("mongoose");

class ListingsController {
  // * hard delete listing
  hardDeleteListing = async (req, res) => {
    try {
      const hdl = await ListingsModel.findOneAndDelete({ _id: req.params.id });

      if (hdl) {
        return res.status(200).json({
          success: true,
          message: "Deleted listing permanently.",
          listing: hdl,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Delete listing failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * restore listing
  restoreListing = async (req, res) => {
    try {
      const rl = await ListingsModel.restore({ _id: req.params.id });

      if (rl) {
        return res.status(200).json({
          success: true,
          message: "Restored listing successfully.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Restore listing failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * get user's deleted listings
  getMyDeletedListings = async (req, res) => {
    try {
      const gdl = await ListingsModel.findDeleted({ owner: req.params.id });

      if (gdl) {
        return res.status(200).json({
          success: true,
          message: "Get deleted listings successfully.",
          listings: gdl,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Get deleted listings failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * create reply to a comment
  createReply = async (req, res) => {
    try {
      const cr = await ListingsModel.updateOne(
        { comments: { $elemMatch: { _id: req.params.id } } },
        { $push: { "comments.$.replies": req.body.data } },
        { new: true }
      );

      if (cr) {
        return res.status(200).json({
          success: true,
          message: "Created reply successfully.",
          reply: req.body.data,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Create reply failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * get listing
  getListing = async (req, res) => {
    try {
      const gl = await ListingsModel.findOne({ _id: req.params.id });

      if (gl) {
        return res.status(200).json({
          success: true,
          message: "Get listing successfully.",
          listing: gl,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Get listing failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * post comment
  postComment = async (req, res) => {
    try {
      const pc = await ListingsModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            comments: {
              _id: mongoose.Types.ObjectId(Math.random()),
              personId: req.body.personId,
              comment: req.body.comment,
              replies: [],
            },
          },
        },
        { new: true }
      );

      if (pc) {
        return res.status(200).json({
          success: true,
          message: "Comment posted",
          listing: pc,
        });
      } else
        return res.status(400).json({
          success: true,
          message: "Post comment failed",
          listing: pc && pc,
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * owner deny request (wait list)
  denyRequest = async (req, res) => {
    try {
      const dr = await ListingsModel.updateOne(
        {
          _id: req.params.id,
          waitList: {
            $elemMatch: { _id: req.body.personId },
          },
        },
        {
          $set: { "waitList.$.accepted": false, "waitList.$.denied": true },
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
          waitList: dr && dr.waitList,
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * accept wait list
  acceptWaitList = async (req, res) => {
    try {
      const awl = await ListingsModel.updateOne(
        {
          _id: req.params.id,
          waitList: {
            $elemMatch: { _id: req.body.personId },
          },
        },
        {
          $set: { "waitList.$.accepted": true, "waitList.$.denied": false },
        },
        { new: true }
      );

      if (awl)
        return res.status(200).json({
          success: true,
          message: "Accepted reservation.",
          waitList: awl.waitList,
        });
      else
        return res.status(400).json({
          success: true,
          message: "Accept reservation failed. (owner's side)",
          waitList: awl && awl.waitList,
        });
    } catch (error) {
      console.log(error);
      internalErrorResponse(res, error);
    }
  };
  // * add to wait list
  addToWaitList = async (req, res) => {
    try {
      const listings = await ListingsModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            waitList: {
              ...req.body,
              createdAt: Date.now(),
            },
          },
        },
        { new: true }
      );

      if (listings)
        return res.status(200).json({
          success: true,
          message: "Add to wait list successfully",
          waitList: listings.waitList,
        });
      else
        return res.status(400).json({
          success: true,
          message: "Add to wait list failed",
          waitList: listings && listings.waitList,
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * delete
  deleteListing = (req, res) => {
    ListingsModel.delete({ _id: req.params.id })
      .then((listings) =>
        listings
          ? res.status(200).json({
              success: true,
              message: "Deleted successfully",
              listings,
            })
          : res.status(400).json({
              success: true,
              message: "Delete failed.",
            })
      )
      .catch((error) => internalErrorResponse(res, error));
  };
  // * get user's listings
  getUsersListings = (req, res) => {
    ListingsModel.find({ owner: req.params.id })
      .then((listings) =>
        listings
          ? res.status(200).json({
              success: true,
              message: "Get user's listings successfully.",
              listings: listings.reverse(),
            })
          : res.status(404).json({
              success: false,
              message: "Users did not have any listings.",
              listings,
            })
      )
      .catch((error) => internalErrorResponse(res, error));
  };
  // * get available listings
  getAvailable = (req, res) => {
    ListingsModel.find({ isAvailable: true })
      .then((listings) =>
        res.status(200).json({
          success: true,
          message: "Get all available listings successfully.",
          listings: listings.reverse(),
        })
      )
      .catch((error) => internalErrorResponse(res, error));
  };
  // * create listing
  create = async (req, res) => {
    try {
      const data = req.body;
      const images = req.files.map((item) => item.filename);

      const newListing = new ListingsModel({
        ...data,
        isAvailable: 1,
        owner: req.userId,
        images,
      });

      await newListing.save();

      return res
        .status(200)
        .json({ success: true, message: "Create listing successfully." });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
  // * update listing
  update = async (req, res) => {
    try {
      const data = req.body;
      const files = req.files?.map((item) => item.filename);

      if (files !== undefined) {
        const updateFiles = files?.length > 0 ? { images: files } : "";

        const updateListing = await ListingsModel.findOneAndUpdate(
          { _id: req.params.id },
          { ...data, $set: updateFiles },
          { new: true }
        );

        if (updateListing)
          return res.status(200).json({
            success: true,
            message: "Updated listing successfully",
            listing: updateListing,
          });
      } else {
        const updateListing = await ListingsModel.findOneAndUpdate(
          { _id: req.params.id },
          { ...data },
          { new: true }
        );

        if (updateListing)
          return res.status(200).json({
            success: true,
            message: "Updated listing successfully",
            listing: updateListing,
          });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  };
}

module.exports = new ListingsController();
