const ForumModel = require("../../models/Forum.model");
const internalErrorResponse = require("../utils/internalErrorResponse");

class ForumController {
  // * delete post
  async deletePost(req, res) {
    try {
      const dp = await ForumModel.delete({ _id: req.params.id });
      console.log(dp);
      if (dp) {
        return res.status(200).json({
          success: true,
          message: "Deleted post successfully.",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Delete post failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
  // * update post
  async updatePost(req, res) {
    try {
      const up = await ForumModel.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, content: req.body.content },
        { new: true }
      );

      if (up) {
        return res.status(200).json({
          success: true,
          message: "Updated posts successfully.",
          post: up,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Update post failed.",
        });
      }
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
  // * get user's post
  async getUsersPosts(req, res) {
    try {
      const lp = await ForumModel.find({ "owner.id": req.params.id });

      if (lp) {
        return res.status(200).json({
          success: true,
          message: "Get posts successfully.",
          posts: lp,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Get post failed.",
        });
      }
    } catch (error) {}
  }
  // * like many posts at a time
  async likePosts(req, res) {
    try {
      const lp = await ForumModel.updateMany(
        { _id: { $in: req.body.ids } },
        {
          $inc: { numLikes: 1 },
        }
      );

      if (lp)
        return res.status(200).json({
          success: true,
          message: "Updated likes.",
        });
      else
        return res.status(400).json({
          success: false,
          message: "Update likes failed.",
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
  //* create comment
  async createComment(req, res) {
    try {
      const cc = await ForumModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              content: req.body.content,
              owner: { id: req.userId, name: req.body.name },
            },
          },
        },
        { new: true }
      );

      if (cc) {
        return res.status(200).json({
          success: true,
          message: "Created comment.",
          comments: cc.comments,
        });
      } else
        return res.status(200).json({
          success: false,
          message: "Create comment failed.",
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
  // * get all posts
  async getAllPosts(req, res) {
    try {
      const gap = await ForumModel.find({});

      if (gap)
        return res.status(200).json({
          success: true,
          message: "Get all posts successfully.",
          posts: gap,
        });
      else
        return res.status(400).json({
          success: true,
          message: "Get all posts successfully.",
        });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
  // * create post
  async createPost(req, res) {
    try {
      const cp = new ForumModel({
        title: req.body.title,
        content: req.body.content,
        owner: { id: req.userId, name: req.body.name },
        numLikes: 0,
        image: req.file ? req.file.filename : undefined,
      });
      await cp.save();

      return res.status(200).json({
        success: true,
        message: "Created post.",
        post: cp,
      });
    } catch (error) {
      internalErrorResponse(res, error);
    }
  }
}

module.exports = new ForumController();
