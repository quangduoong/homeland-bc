const listingsRoute = require("./Listings/Listings.route");
const usersRoute = require("./Users/Users.route");
const paymentRoute = require("./StripePayment/Payment.route");
const forumRoute = require("./Forum/Forum.route");

const router = (app) => {
  app.use("/forum", forumRoute);
  app.use("/payment", paymentRoute);
  app.use("/listings", listingsRoute);
  app.use("/users", usersRoute);
};

module.exports = router;
