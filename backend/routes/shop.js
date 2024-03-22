const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
const orderController = require("../controllers/orders");
const isAuth = require("../middleware/is-auth");

router.get("/search", shopController.searchBasedFromUser);

router.get("/shop", shopController.home);

router.get("/user/orders/:id", isAuth, shopController.getUserSingleOrderDetail);

router.get("/categories", shopController.getCategoriesList);

router.get(
  "/collections/:categoryid",
  shopController.getCategoryInfoWithAttributes
);

router.get(
  "/collections-product/:categoryid",
  shopController.getCategoriesWiseProductsLists
);

router.get("/products/:productid", shopController.getProductsDetails);

router.post("/orders", isAuth, shopController.getUserOrderslist);

router.get("/cart/:userid", isAuth, shopController.getCart);

router.post("/cart/:userid", isAuth, shopController.postCart);

router.post("/checkout/cod", orderController.postCodCheckout);

router.post("/checkout/razorpay", orderController.initializeRazorpay);

router.post("/paymentverify", orderController.verifyRazorPayment);

module.exports = router;
