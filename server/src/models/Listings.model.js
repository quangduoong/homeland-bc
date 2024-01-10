const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Listings = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    address: {
      details: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    },
    area: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
    },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    status: {
      type: String,
      enum: ["for rent", "shared room"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    payment: {
      price: {
        type: Number,
        required: true,
      },
      period: {
        type: String,
        enum: ["day", "month", "year"],
        required: true,
      },
    },
    images: { type: [String], required: true },
    waitList: Array,
    comments: Array,
    depositAmount: Number,
    depositBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    depositAddress: String,
    depositStatus: String,
    depositCreatedAt: Date,
  },
  { timestamps: true, strictQuery: false }
);

Listings.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Listings", Listings);
