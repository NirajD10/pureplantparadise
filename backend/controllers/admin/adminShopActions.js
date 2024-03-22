const { validationResult } = require("express-validator");
const { Product, ProductDetails } = require("../../models/product");
const Category = require("../../models/category");
const Attribute = require("../../models/attributes");
const Order = require("../../models/orders");
const Payment = require("../../models/payment");
const Shop = require("../../models/shop");

const firebaseService = require("../../services/firebaseService");

// POST Method - Update shipment tracking Order
exports.postCarrierwithTrackingNumber = async (req, res, next) => {
  const orderid = req.params.orderid;
  const { carrier, tracking_number } = req.body;
  try {
    const update_order = await Order.updateMany(
      { _id: orderid },
      {
        $set: {
          carrier: { carriername: carrier, trackingid: tracking_number },
          status: "Shipped",
        },
      }
    );

    if (update_order.length === 0) {
      const error = new Error("Couldn't update. Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({ message: "Successfully update." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// POST Method - Update order status
exports.updateOrderStatus = async (req, res, next) => {
  const { orderid } = req.params;
  const { status } = req.body;
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      { _id: orderid },
      { status: status }
    );

    if (updateOrderStatus.length === 0) {
      const error = new Error("Couldn't update. Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({ message: "Successfully update." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// PUT Method - COD update status
exports.updateOrdercodstatus = async (req, res, next) => {
  const { paymentid } = req.params;

  try {
    if (!paymentid) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const codupdatestatus = await Payment.findByIdAndUpdate(
      { _id: paymentid },
      { status: "Paid" }
    );

    if (codupdatestatus.length === 0) {
      const error = new Error("Couldn't update. Something went wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json({ message: "Successfully update." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// DELETE Method - Delete Single Product
exports.deleteSingleProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error("Couldn't find attribute.");
      error.statusCode = 400;
      throw error;
    }

    //Delete Firebase image before deleting db.
    const getFeaturedImage = await Product.findById(id);
    const getMediaImage = await ProductDetails.find({ product_id: id });

    await firebaseService.removeImage(
      getFeaturedImage.featuredimageUrl,
      next
    );

    getMediaImage[0].mediaurl.forEach(async (url) => {
      await firebaseService.removeImage(url, next);
    });

    const delete_product_details = await ProductDetails.deleteOne({
      product_id: id,
    });

    if (!delete_product_details.acknowledged) {
      const error = new Error("Wouldn't delete. Please contact administrator");
      error.statusCode = 500;
      throw error;
    }
    await Product.deleteOne({ _id: id });

    res.status(200).json({ message: "Sucessfully deletion." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// POST Method - Create new Product
exports.postProduct = async (req, res, next) => {
  try {
    const productInputData = JSON.parse(req.body.productInputData);
    const media = req.files["media"];
    const featuredImage = req.files["featureimage"][0];

    //TODO: Add validation in express validator

    // const validationerror = validationResult(req);

    // if (!validationerror.isEmpty()) {
    //   const error = new Error("Validation Failed, entered data is incorrect.");
    //   error.statusCode = 422;
    //   error.data = validationerror.array();
    //   next(error);
    // }

    if (!media || !featuredImage) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }

    const featured_imageurl = await firebaseService.uploadImageToFirebase(
      featuredImage,
      "Thumbnails"
    );

    const media_imageurl = await firebaseService.uploadImageToFirebase(
      media,
      "Media"
    );

    const product = new Product({
      productname: productInputData.productname,
      price: productInputData.price,
      oldprice: productInputData?.oldprice ? productInputData?.oldprice : null,
      featuredimageUrl: featured_imageurl,
      categories: productInputData.categories,
      attributes: productInputData.attributes,
      sku: productInputData.sku,
    });

    const result = await product.save();
    if (result) {
      const productdetails = new ProductDetails({
        product_id: result._id,
        short_description: productInputData.shortdescription,
        description: productInputData.description,
        mediaurl: media_imageurl,
        status: productInputData.status,
        mangestock: productInputData.managestock,
        quantity: productInputData?.quantity ? productInputData.quantity : null,
        stock_availability: productInputData.stock_availability,
        weight: productInputData.weight,
      });

      const pd_result = await productdetails.save();

      if (pd_result) {
        const updateProduct = await Product.findById(result._id);
        if (!updateProduct) {
          const error = new Error("Couldn't find product.");
          error.statusCode = 404;
          throw error;
        }

        updateProduct.productdetails = pd_result._id;
        await updateProduct.save();

        res.status(201).json({
          message: "Successfully created product",
        });
      }
    } else {
      const error = new Error("Not able to save data.");
      error.statusCode = 500;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// PUT Method - Update Product
exports.putEditProductDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    let inputdata;
    const featuredImage = req.files?.featureimage;

    if (featuredImage) {
      inputdata = JSON.parse(req.body.inputdata);
    } else {
      inputdata = req.body.inputdata;
    }

    // Function handler for overwrite data
    async function overwriteDataHandler(id, generatedImageUrl) {
      // console.log("generated new url -> ", generatedImageUrl);
      const result_updation = await Product.findById(id);

      if (!result_updation) {
        const error = new Error("Could not find Product.");
        error.statusCode = 400;
        throw error;
      }

      result_updation.productname = inputdata.productname;
      result_updation.price = inputdata.price;
      result_updation.oldprice = inputdata?.oldprice
        ? inputdata?.oldprice
        : null;
      result_updation.featuredimageUrl = generatedImageUrl
        ? generatedImageUrl
        : inputdata?.featureimage;
      result_updation.categories = inputdata.categories;
      result_updation.attributes = inputdata.attributes;
      result_updation.sku = inputdata.sku;

      const update_product_result = await result_updation.save();

      if (update_product_result) {
        const update_product_details = await ProductDetails.findById(
          result_updation.productdetails
        );

        update_product_details.product_id = result_updation._id;
        update_product_details.short_description = inputdata.shortdescription;
        update_product_details.description = inputdata.description;
        update_product_details.mediaurl = inputdata.media;
        update_product_details.status = inputdata.status;
        update_product_details.mangestock = inputdata.managestock;
        update_product_details.quantity = inputdata?.quantity
          ? inputdata.quantity
          : null;
        update_product_details.stock_availability = inputdata.stockavailability;
        update_product_details.weight = inputdata.weight;

        const update_pd_result = await update_product_details.save();

        if (!update_pd_result) {
          const error = new Error("Could not update.");
          error.statusCode = 503;
          throw error;
        }

        return {
          product: update_product_result,
          product_details: update_pd_result,
        };
      }
    }

    if (!inputdata.hasOwnProperty("featureimage")) {
      const bannerURLDB = await Product.findById(id).select("featuredimageUrl");

      //Delete image from firebase
      const deleteImageFromFirebase = await firebaseService.removeImage(
        bannerURLDB["featuredimageUrl"],
        next
      );

      if (deleteImageFromFirebase) {
        //after deletion, upload new image to firebase and generate new url.

        const newImageUrl = await firebaseService.uploadImageToFirebase(
          featuredImage[0],
          "Thumbnails"
        );

        const result_modify_db = await overwriteDataHandler(id, newImageUrl);

        res.status(201).json({
          message: "Successfully updated product.",
          payload: result_modify_db,
        });
      }
    } else {
      const modify_data = await overwriteDataHandler(id);

      res.status(201).json({
        message: "Successfully updated product.",
        payload: modify_data,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// PUT Method - Update Category
exports.putEditCategoryDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const inputdata = JSON.parse(req.body.inputdata);
    const breadcrumbbannerimage = req.files?.breadcrumbbanner;
    const thumbnailimage = req.files?.thumbnail;

    async function handleImageUpdate(imageUrlKey, imageFile, foldername) {
      // get exist banner url from mongodb
      const bannerURLDB = await Category.findById(id).select(imageUrlKey);

      //Delete image from firebase
      const deleteImageFromFirebase = await firebaseService.removeImage(
        bannerURLDB[imageUrlKey],
        next
      );

      if (deleteImageFromFirebase) {
        //after deletion, upload new image to firebase and generate new url.
        const newImageUrl = await firebaseService.uploadImageToFirebase(
          imageFile[0],
          foldername
        );

        const result_updation = await Category.findById(id);

        if (!result_updation) {
          throw new Error("Could not find Category.");
        }

        result_updation.title = inputdata.categoryname;
        result_updation.description = inputdata.description;
        result_updation.category_bannerurl =
          imageUrlKey === "category_bannerurl"
            ? newImageUrl
            : inputdata.breadcrumbbanner;
        result_updation.thumbnail_imageurl =
          imageUrlKey === "thumbnail_imageurl"
            ? newImageUrl
            : inputdata.thumbnail;
        result_updation.status = inputdata.status;
        result_updation.ismenuinclude = inputdata.menuinlcude;

        const categoryupdateresult = await result_updation.save();

        if (!categoryupdateresult) {
          throw new Error("Not able to save data.");
        }

        return categoryupdateresult;
      } else {
        throw new Error("Something went wrong on server");
      }
    }

    // check conditions whether they property exist in inputdata or not and apply logical code each condition.
    if (!inputdata.hasOwnProperty("breadcrumbbannerimage")) {
      const categoryupdateresult = await handleImageUpdate(
        "category_bannerurl",
        breadcrumbbannerimage,
        "Banner"
      );
      res.status(201).json({
        message: "Successfully updated category.",
        category: categoryupdateresult,
      });
    } else if (!inputdata.hasOwnProperty("thumbnail")) {
      const categoryupdateresult = await handleImageUpdate(
        "thumbnail_imageurl",
        thumbnailimage,
        "Thumbnails"
      );
      res.status(201).json({
        message: "Successfully updated category.",
        category: categoryupdateresult,
      });
    } else if (
      !inputdata.hasOwnProperty("thumbnail") &&
      !inputdata.hasOwnProperty("breadcrumbbannerimage")
    ) {
      const categoryupdateresult = await handleImageUpdate(
        "category_bannerurl",
        breadcrumbbannerimage,
        "Banner"
      );
      const categoryupdateresult2 = await handleImageUpdate(
        "thumbnail_imageurl",
        thumbnailimage,
        "Thumbnails"
      );
      res.status(201).json({
        message: "Successfully updated category.",
        category: { categoryupdateresult, categoryupdateresult2 },
      });
    } else if (
      inputdata.hasOwnProperty("breadcrumbbannerimage") &&
      inputdata.hasOwnProperty("thumbnail")
    ) {
      const result_updation = await Category.findById(id);

      if (!result_updation) {
        throw new Error("Could not find Category.");
      }

      result_updation.title = inputdata.categoryname;
      result_updation.description = inputdata.description;
      result_updation.category_bannerurl = inputdata.breadcrumbbanner;
      result_updation.thumbnail_imageurl = inputdata.thumbnail;
      result_updation.status = inputdata.status;
      result_updation.ismenuinclude = inputdata.menuinlcude;

      const categoryupdateresult = await result_updation.save();

      if (!categoryupdateresult) {
        throw new Error("Not able to save data.");
      }

      res.status(201).json({
        message: "Successfully updated category.",
        category: categoryupdateresult,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// PUT Method - Edit Attribute Data
exports.putEditAttributeDetails = async (req, res, next) => {
  const { id } = req.params;
  const editinputattribute_data = req.body.attribute_data;

  // console.log(editinputattribute_data);
  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const editAttribute = await Attribute.findById(id);

    if (!editAttribute) {
      const error = new Error(
        "Something went wrong.Please contact administration"
      );
      error.statusCode = 500;
      throw error;
    }

    editAttribute.name = editinputattribute_data.attributesname;
    editAttribute.attribute_code = editinputattribute_data.attributescode;
    editAttribute.attribute_options = editinputattribute_data.attribute_options;
    editAttribute.attribute_group = editinputattribute_data.parentcategories;
    editAttribute.display_customer = editinputattribute_data.displaycustomer;

    const result_updation = await editAttribute.save();

    if (!result_updation) {
      const error = new Error("Couldn't update. Please try again later.");
      error.statusCode = 500;
      throw error;
    }

    res.status(201).json({ message: "Successfully update." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// POST Method - Create new Category
exports.postCategory = async (req, res, next) => {
  try {
    const inputdata = JSON.parse(req.body.inputdata);
    const breadcrumbbannerimage = req.files.breadcrumbbanner;
    const thumbnailimage = req.files.thumbnail;

    const validationerror = validationResult(req);

    if (!validationerror.isEmpty()) {
      const error = new Error("Validation Failed, entered data is incorrect.");
      error.statusCode = 422;
      error.data = validationerror.array();
      throw error;
    }

    if (!breadcrumbbannerimage || !thumbnailimage) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }

    const category_bannerurl = await firebaseService.uploadImageToFirebase(
      breadcrumbbannerimage[0],
      "Banner"
    );
    const thumbnail_imageurl = await firebaseService.uploadImageToFirebase(
      thumbnailimage[0],
      "Thumbnails"
    );

    const category = new Category({
      title: inputdata.categoryname,
      categoriesid: inputdata.categoriesid,
      description: inputdata.description,
      category_bannerurl: category_bannerurl,
      thumbnail_imageurl: thumbnail_imageurl,
      status: inputdata.status,
      ismenuinclude: inputdata.menuinlcude,
    });

    //TODO: create error or waring about categoriesid unique

    const resultCategoryData = await category.save();

    if (!resultCategoryData) {
      const error = new Error("Not able to save data.");
      error.statusCode = 500;
      throw error;
    }

    res.status(201).json({
      message: "Successfully created category",
      category: resultCategoryData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// POST Method - Create new Attributes
exports.postAttributes = async (req, res, next) => {
  const {
    attributesname,
    attributescode,
    attribute_options,
    parentcategories,
    displaycustomer,
  } = req.body;

  const validationerror = validationResult(req);

  if (!validationerror.isEmpty()) {
    const error = new Error("Validation Failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = validationerror.array();
    next(error);
  }

  try {
    const attribute = new Attribute({
      name: attributesname.toString(),
      attribute_code: attributescode,
      attribute_options: attribute_options,
      attribute_group: parentcategories,
      display_customer: displaycustomer,
    });

    const result = await attribute.save();

    if (!result) {
      const error = new Error("Not able to save data.");
      error.statusCode = 500;
      throw error;
    }

    res
      .status(201)
      .json({ message: "Successfully created category", attribute: result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//DELETE Method - delete attribute from list.
exports.deleteSingleAttribute = async (req, res, next) => {
  const attributeid = req.params.attributeid;

  try {
    if (!attributeid) {
      const error = new Error("Couldn't find attribute.");
      error.statusCode = 400;
      throw error;
    }

    const result = await Attribute.deleteOne({ _id: attributeid });

    if (!result) {
      const error = new Error("Wouldn't delete. Please contact administrator");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({ message: "Sucessfully deletion." });
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// PUT Method - Store Settings update or Create.
exports.putShopSettings = async (req, res, next) => {
  const inputdata = req.body.inputdata;
  // const bannerImages = req.files?.bannerimage;

  try {
    const shopsettings = await Shop.find({});

    if (shopsettings.length === 0) {
      // const store_bannerUrl = await firebaseService.uploadImageToFirebase(
      //   bannerImages,
      //   "Store Banner"
      // );

      const newShopSettings = new Shop({
        shipping_policy: inputdata.shipping_policy,
        delivery_message: inputdata.delivery_message,
        return_policy: inputdata.return_policy,
        // banner_image: store_bannerUrl
      });

      await newShopSettings.save();

      res.status(201).json({ message: "Successfully updated." });
    }

    shopsettings[0].shipping_policy = inputdata.shipping_policy;
    shopsettings[0].delivery_message = inputdata.delivery_message;
    shopsettings[0].return_policy = inputdata.return_policy;

    await shopsettings[0].save();

    res.status(201).json({ message: "Successfully updated." });
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
