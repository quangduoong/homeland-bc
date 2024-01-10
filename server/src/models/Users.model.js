const { Schema, default: mongoose } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Users = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: Date,
    idNumber: Number,
    address: String,
    phone: Number,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: String,
    isOwner: Boolean,
    onWaitList: Array,
    ethAddress: String,
  },
  { timestamps: true }
);

Users.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Users", Users);
