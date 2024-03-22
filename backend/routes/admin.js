const express = require("express");
const router = express.Router();
const multer = require("multer");

const { validate } = require("../middleware/validation");

// const shopAdminController = require("../controllers/admin-shop");
const shopActionController = require("../controllers/admin/adminShopActions");
const shopReadController = require("../controllers/admin/adminShopRead");

const authControllers = require("../controllers/auth");

const isAuth = require("../middleware/is-admin-auth");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
});

router.post("/login", validate("login"), authControllers.adminLoginAccount);

router.get("/dashboard", isAuth, shopReadController.getDashboard);

router.get("/orders", isAuth, shopReadController.getOrderslist);

router.get("/orders/:id", isAuth, shopReadController.getSingleOrderDetails);

router.post(
  "/orders/updatecarrier/:orderid",
  isAuth,
  shopActionController.postCarrierwithTrackingNumber
);

router.put(
  "/orders/updatestatus/:orderid",
  isAuth,
  shopActionController.updateOrderStatus
);

router.put(
  "/orders/updatecodstatus/:paymentid",
  isAuth,
  shopActionController.updateOrdercodstatus
);

router.get("/customer-list", isAuth, shopReadController.getCustomersList);

router.get(
  "/single-customer-detail/:id",
  isAuth,
  shopReadController.getsingleCustomerDetail
);

router.get("/products", isAuth, shopReadController.getProductsList);

router.delete("/products/:id", isAuth, shopActionController.deleteSingleProduct);

router.post(
  "/products/new",
  upload.fields([
    {
      name: "media",
      maxCount: 5,
    },
    {
      name: "featureimage",
      maxCount: 1,
    },
  ]),
  isAuth,
  shopActionController.postProduct
);

router.get(
  "/products/edit/:id",
  isAuth,
  shopReadController.getEditProductDetails
);

router.put(
  "/products/edit/:id",
  upload.fields([
    {
      name: "featureimage",
      maxCount: 1,
    },
  ]),
  isAuth,
  shopActionController.putEditProductDetails
);

router.get("/categories", isAuth, shopReadController.getCategoryList);

router.get(
  "/categories/edit/:id",
  isAuth,
  shopReadController.getEditCategoryDetails
);

router.put(
  "/categories/edit/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    { name: "breadcrumbbanner", maxCount: 1 },
  ]),
  isAuth,
  shopActionController.putEditCategoryDetails
);

router.post(
  "/categories",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    { name: "breadcrumbbanner", maxCount: 1 },
  ]),
  isAuth,
  validate("new-category"),
  shopActionController.postCategory
);

router.get("/attributes", isAuth, shopReadController.getAttributeList);

router.get(
  "/attributes/edit/:id",
  isAuth,
  shopReadController.getEditAttributesDetails
);

router.put(
  "/attributes/edit/:id",
  isAuth,
  shopActionController.putEditAttributeDetails
);

router.get(
  "/attributes/:selectedcategory",
  isAuth,
  shopReadController.getAttributeListInputField
);

router.post(
  "/attributes",
  isAuth,
  validate("new-attribute"),
  shopActionController.postAttributes
);

router.delete(
  "/attributes/:attributeid",
  isAuth,
  shopActionController.deleteSingleAttribute
);

router.get("/shop-settings", isAuth, shopReadController.getStoreSettings);

router.put(
  "/shop-settings",
  upload.fields([
    {
      name: "bannerimage",
      maxCount: 1,
    },
  ]),
  isAuth,
  shopActionController.putShopSettings
);

module.exports = router;
