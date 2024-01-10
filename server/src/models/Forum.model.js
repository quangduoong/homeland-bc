const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Forum = mongoose.Schema(
  {
    owner: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      name: String,
    },
    title: String,
    content: String,
    comments: Array,
    numLikes: Number,
    image: String,
  },
  { timestamps: true }
);

Forum.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Forum_Posts", Forum);
