const stripeRouter = require("express").Router();
const stripe = require("stripe")("sk_test_51MQuzpGfWhRxAyNRTVEB0UkcElXJrimkSGo0R9UdklrC0fFCvn6Q4IvMgkvEgweiqMHfRCjGy8jNdBoqNkWiNkPe00KAqj3sgR");

stripeRouter.post("/", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.articulos,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: `${req.body.domain}/success`,
    cancel_url: `${req.body.domain}/cancel`,
  });

  res.redirect(303, session.url);
});

module.exports = stripeRouter;
