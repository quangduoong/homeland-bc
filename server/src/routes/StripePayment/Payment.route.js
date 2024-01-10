const verifyToken = require("../../middleware/verifyToken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const router = require("express").Router();

router.post("/create-payment", verifyToken, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ID: " + req.body.item.listingId,
            },
            unit_amount: req.body.item.price,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5000/success.html",
      cancel_url: "http://localhost:5000/cancel.html",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
