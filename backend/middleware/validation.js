const { body, check } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "new-product":
      return [
        body("title")
          .notEmpty()
          .escape()
          .withMessage("Please enter a product name"),
        body("price").notEmpty().withMessage("Please enter a product price"),
        body("imageurl").notEmpty().withMessage("Please Upload Image"),
      ];

    case "new-category":
      return [
        body("inputdata.categoryname")
          .notEmpty()
          .escape()
          .withMessage("Please enter a category name"),
        body("inputdata.categoriesid")
          .notEmpty()
          .escape()
          .withMessage("Please enter a categories id"),
        check("files.thumbnail").custom((value, { req }) => {
          if (!req.files.thumbnail) {
            throw new Error("Please upload an image");
          }

          const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
          if (!allowedMimeTypes.includes(req.files.thumbnail[0].mimetype)) {
            throw new Error("Only JPEG, PNG, and JPG images are allowed");
          }

          return true;
        }),
        body("files.breadcrumbbanner").custom((value, { req }) => {
          if (!req.files.breadcrumbbanner) {
            throw new Error("Please upload an image");
          }

          const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
          if (
            !allowedMimeTypes.includes(req.files.breadcrumbbanner[0].mimetype)
          ) {
            throw new Error("Only JPEG, PNG, and JPG images are allowed");
          }

          return true;
        }),
      ];

    case "new-attribute":
      return [
        body("attributesname")
          .notEmpty()
          .escape()
          .withMessage("Please enter an attribute name"),
        body("attributescode")
          .notEmpty()
          .escape()
          .withMessage("Please enter an attribute code"),
        body("parentcategories")
          .notEmpty()
          .escape()
          .withMessage("Please select attribute group"),
      ];

    case "login":
      return [
        body("email")
          .trim()
          .isEmail()
          .withMessage("Please enter an email address"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("The password must be at least 6 characters"),
      ];
      
    default:
      return;
  }
};
