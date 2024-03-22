const { validationResult } = require("express-validator");
const { Product } = require("../../models/product");
const Category = require("../../models/category");
const Attribute = require("../../models/attributes");
const Customer = require("../../models/customers");
const Order = require("../../models/orders");
const Shop = require("../../models/shop");

// GET Method - Dashboard
exports.getDashboard = async (req, res, next) => {
  try {
    //Total Sucessful Order Revenue
    const totalRevenueandSales = await Order.aggregate([
      {
        $lookup: {
          from: "payments",
          localField: "paymentid",
          foreignField: "_id",
          as: "payments_amount",
        },
      },
      {
        $match: {
          "payments_amount.status": "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: "$amount",
          },
          totalSales: {
            $sum: 1,
          },
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // To get per months sales order aggeration
    const aggeratepermonthSaleOrder = await Order.aggregate([
      {
        $lookup: {
          from: "payments",
          localField: "paymentid",
          foreignField: "_id",
          as: "payments_amount",
        },
      },
      {
        $match: {
          "payments_amount.status": "paid",
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%b", date: "$createdAt" } },
          },
          totalSales: { $sum: "$amount" },
        },
      },
      {
        $project: {
          month: "$_id.month",
          totalSales: 1,
          _id: 0,
        },
      },
    ]);

    // Map the aggregated data to an object for easier access
    const salesByMonth = aggeratepermonthSaleOrder.reduce((acc, cur) => {
      acc[cur.month] = cur.totalSales;
      return acc;
    }, {});

    const permonthSaleOrder = months.map((month) => ({
      month,
      Sales: salesByMonth[month] || 0,
    }));

    //Total Overall Order
    const totalOrders = await Order.find().countDocuments();

    //Total Registered Customer Account
    const totalCustomers = await Customer.find().countDocuments();

    res.status(200).json({
      totalRevenue: totalRevenueandSales[0].totalAmount,
      totalSales: totalRevenueandSales[0].totalSales,
      totalOrders,
      totalCustomers,
      permonthSaleOrder,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Orders List Table
exports.getOrderslist = async (req, res, next) => {
  try {
    const orderslist = await Order.find({})
      .select("order_number email amount status createdAt paymentid")
      .populate("paymentid", "status");

    if (!orderslist) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(orderslist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//GET Method - Single Order Details
exports.getSingleOrderDetails = async (req, res, next) => {
  const id = req.params.id;

  try {
    const orderdetails = await Order.find({ _id: id })
      .populate("paymentid")
      .populate(
        "items.productid",
        "productname sku price featuredimageUrl carrier"
      );

    if (!orderdetails) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    const order_detail = {
      _id: orderdetails[0]._id,
      order_number: orderdetails[0].order_number,
      status: orderdetails[0].status,
      product_list: orderdetails[0].items,
      total_cost: orderdetails[0].amount,
      shippingcost: Number(orderdetails[0].shippingcost),
      tax: Number(orderdetails[0].tax),
    };

    const carrier_detail = {
      tracking_number: orderdetails[0]?.carrier.trackingid,
      carrier_name: orderdetails[0]?.carrier.carriername,
    };

    const payment_detail = orderdetails[0].paymentid;

    const customerdetail = {
      email: orderdetails[0].email,
      phoneno: orderdetails[0].contact,
      shipping_address: orderdetails[0].shipping_address,
      billing_address: orderdetails[0].billing_address,
      notes: orderdetails[0]?.customernote
        ? orderdetails[0].customernote
        : "No Notes from customer",
    };

    res
      .status(200)
      .json({ order_detail, payment_detail, customerdetail, carrier_detail });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Products List Table
exports.getProductsList = async (req, res, next) => {
  try {
    const productlist = await Product.find({})
      .select("productname price featuredimageUrl sku")
      .populate("productdetails", "status quantity");

    if (!productlist) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(productlist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//GET Method - Fetch Single Product details
exports.getEditProductDetails = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const editProductsDetails = await Product.findById(id)
      .populate("productdetails")
      .populate("categories", "title");

    if (!editProductsDetails) {
      const error = new Error("Couldn't find resource.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(editProductsDetails);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Category List Table
exports.getCategoryList = async (req, res, next) => {
  try {
    const categorylist = await Category.find({}).select(
      "id title thumbnail_imageurl status ismenuinclude"
    );

    if (!categorylist) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(categorylist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Category Form Details
exports.getEditCategoryDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const editdata = await Category.find({ _id: id });

    if (editdata.length === 0) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(editdata[0]);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Attribute Form Details
exports.getEditAttributesDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error("Missing id params");
      error.statusCode = 400;
      throw error;
    }

    const editdata = await Attribute.find({ _id: id }).populate(
      "attribute_group",
      "_id title"
    );

    if (editdata.length === 0) {
      const error = new Error("Something went wrong.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(editdata[0]);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Attribute List Table
exports.getAttributeList = async (req, res, next) => {
  try {
    const attributelist = await Attribute.find({})
      .select("name display_customer")
      .populate("attribute_group", "title");

    if (!attributelist) {
      const error = new Error("Something went wrong.");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json(attributelist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Customers List Table
exports.getCustomersList = async (req, res, next) => {
  try {
    const customerlist = await Customer.find().select(
      "full_name email status createdAt"
    );

    if (!customerlist) {
      const error = new Error("Couldn't fetch customer list");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json(customerlist);
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Single Customer Detail
exports.getsingleCustomerDetail = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id) {
      const error = new Error("Couldn't find resource.");
      error.statusCode = 400;
      throw error;
    }

    const customerdetail = await Customer.findOne({ _id: id }).populate(
      "orders",
      "amount status order_number createdAt"
    );

    if (!customerdetail) {
      const error = new Error("Something went wrong. Please contact admin.");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json(customerdetail);
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Display and filter Attribute list from categories selection
exports.getAttributeListInputField = async (req, res, next) => {
  const selectedcategory = req.params.selectedcategory;

  try {
    if (!selectedcategory) {
      const error = new Error("Couldn't find category selection.");
      error.statusCode = 400;
      throw error;
    }

    const responseattributelist = await Attribute.find({
      attribute_group: selectedcategory,
    }).select("name attribute_options attribute_code");

    const attributelist = responseattributelist.map((data) => {
      return {
        _id: data._id,
        name: data.name,
        attribute_code: data.attribute_code,
        options: data.attribute_options.map((item) => {
          return {
            value: item._id,
            label: item.value,
          };
        }),
      };
    });

    res.status(200).json(attributelist);
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET Method - Store Settings Form Input data
exports.getStoreSettings = async (req, res, next) => {
  try {
    const shopsettings = await Shop.find({});

    if (shopsettings.length === 0) {
      const error = new Error("Wouldn't get data. Please try again later.");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json(shopsettings[0]);
  } catch (error) {
    if (!error?.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
