const crypto = require("crypto");
const { uid } = require("uid");
const Order = require("../models/orders");
const Customer = require("../models/customers");
const Payment = require("../models/payment");
const razorpayinstance = require("../config/razorpay.config");
const { ProductDetails } = require("../models/product");

let orderid;
let customerid;

exports.initializeRazorpay = async (req, res, next) => {
  const { amount, formdetails, cart_items } = req.body;
  // console.log("FormDetails: -", formdetails);

  try {
    if (!formdetails) {
      const error = new Error("Please fill checkout form before proceed.");
      error.statusCode = 400;
      throw error;
    }

    //Razorpay creation order
    const orderoptions = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const createorder = await razorpayinstance.orders.create(orderoptions);

    // console.log("Razorpay createdOrder:", createorder);

    const email = formdetails.contact.email;
    const cartItems = cart_items.map((item) => {
      return {
        productid: item._id,
        quantity: item.quantity,
      };
    });

    const existsemail = await Customer.find({ email: email });
    let order;

    //customer's email if not exits, then alternative solution to create order collection.
    if (existsemail.length === 0) {
      const payment = new Payment({
        order_email: email,
        gateway: formdetails.gatewayType,
        type: formdetails.paymentType,
        amount: amount,
        razorpay_orderid: createorder.id,
      });

      const result_payment = await payment.save();
      if (!result_payment) {
        const error = new Error(
          "Something went wrong saving payment on server"
        );
        error.statusCode = 400;
        throw error;
      }

      //TODO: collect store for shippingcost and tax.

      order = new Order({
        email: email,
        contact: formdetails.contact.phoneno,
        paymentid: result_payment._id,
        items: cartItems,
        amount: Number(amount),
        shippingcost: 0,
        tax: 0,
        shipping_address: {
          full_name: formdetails.shippingaddress.fullname,
          address: formdetails.shippingaddress.address,
          city: formdetails.shippingaddress.city,
          state: formdetails.shippingaddress.addressstate,
          country: formdetails.shippingaddress.country,
          zip: formdetails.shippingaddress.pincode,
        },
        billing_address: {
          full_name: formdetails.billingaddress.fullname,
          address: formdetails.billingaddress.address,
          city: formdetails.billingaddress.city,
          state: formdetails.billingaddress.addressstate,
          country: formdetails.billingaddress.country,
          zip: formdetails.billingaddress.pincode,
        },
      });

      const result_order = await order.save();
      orderid = result_order._id;
    } else {
      //Otherwise register 'order' collection with reference
      const payment = new Payment({
        customerid: existsemail[0]._id,
        gateway: formdetails.gatewayType,
        type: formdetails.paymentType,
        amount: amount,
        razorpay_orderid: createorder.id,
      });

      const result_payment = await payment.save();

      if (!result_payment) {
        const error = new Error(
          "Something went wrong saving payment on server"
        );
        error.statusCode = 400;
        throw error;
      }

      // console.log("Created Payment id", result_payment._id);

      order = new Order({
        customerid: existsemail[0]._id,
        email: formdetails.contact.email,
        contact: formdetails.contact.phoneno,
        paymentid: result_payment._id,
        amount: Number(amount),
        items: cartItems,
        shippingcost: 0,
        tax: 0,
        shipping_address: {
          full_name: formdetails.shippingaddress.fullname,
          address: formdetails.shippingaddress.address,
          city: formdetails.shippingaddress.city,
          state: formdetails.shippingaddress.addressstate,
          country: formdetails.shippingaddress.country,
          zip: formdetails.shippingaddress.pincode,
        },
        billing_address: {
          full_name: formdetails.billingaddress.fullname,
          address: formdetails.billingaddress.address,
          city: formdetails.billingaddress.city,
          state: formdetails.billingaddress.addressstate,
          country: formdetails.billingaddress.country,
          zip: formdetails.billingaddress.pincode,
        },
      });

      const result_order = await order.save();

      //Update User orders list
      const updateUserOrders = await Customer.findOneAndUpdate(
        { _id: existsemail[0]._id },
        { $push: { orders: result_order._id } }
      );
      const result_updateUser = await updateUserOrders.save();

      orderid = result_order._id;
      customerid = existsemail[0]._id;
    }

    // Update Product Quantity after placed order
    cartItems.forEach(async (items) => {
      const existProduct = await ProductDetails.findOne({
        product_id: items.productid,
      });
      if (existProduct.quantity !== null) {
        existProduct.quantity = existProduct.quantity - items.quantity;
        await existProduct.save();
      }
    });

    res.status(200).json({
      message: "Successful",
      details: createorder,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyRazorPayment = async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  // verify razorpay payment and update according if sucessful or not
  try {
    const response_body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(response_body.toString())
      .digest("hex");

    const isAutheticated = generated_signature === razorpay_signature;

    if (customerid) {
      const clearcart = await Customer.findOneAndUpdate(
        { _id: customerid },
        { cart: { items: [] } },
        {
          new: true,
          upsert: true,
        }
      );

      if (!clearcart) {
        const error = new Error(
          "Couldn't clear cart. Please contact Administration"
        );
        error.statusCode = 400;
        throw error;
      }

      await clearcart.save();
    }

    if (isAutheticated) {
      const updatePayment = await Payment.findOneAndUpdate(
        { razorpay_orderid: razorpay_order_id },
        {
          status: "paid",
          razorpay_payment: {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            signature: razorpay_signature,
          },
        },
        { new: true, upsert: true }
      );

      await updatePayment.save();

      customerid = "";
      res.redirect(
        `${process.env.FRONTEND_URL}/orderpayment?reference=${razorpay_payment_id}&status=successful`
      );
    } else {
      const updatePayment = await Payment.findOneAndUpdate(
        { razorpay_orderid: razorpay_order_id },
        {
          status: "failed",
          razorpay_payment: {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            signature: razorpay_signature,
          },
        },
        { new: true, upsert: true }
      );

      await updatePayment.save();

      const updateOrder = await Order.findOneAndUpdate(
        { _id: orderid },
        { status: "Failed" },
        { new: true, upsert: true }
      );
      if (!updateOrder) {
        const error = new Error(
          "Couldn't update Order Status. Please contact Administration"
        );
        error.statusCode = 400;
        throw error;
      }

      await updateOrder.save();
      orderid = "";
      customerid = "";
      res.redirect(
        `${process.env.FRONTEND_URL}/orderpayment?reference=${razorpay_payment_id}&status=fail`
      );
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postCodCheckout = async (req, res, next) => {
  const { amount, formdetails, cart_items } = req.body;
  // console.log("This route api worked!");
  console.log("COD AMount data ->", amount);

  try {
    if (!formdetails) {
      const error = new Error("Please fill checkout form before proceed.");
      error.statusCode = 400;
      throw error;
    }

    const email = formdetails.contact.email;
    const cartItems = cart_items.map((item) => {
      return {
        productid: item._id,
        quantity: item.quantity,
      };
    });

    const existsemail = await Customer.find({ email: email });

    let order;
    let referenceid;

    if (existsemail.length === 0) {
      const generatedpaymentid = uid();
      const payment = new Payment({
        order_email: email,
        gateway: formdetails.gatewayType ? formdetails.gatewayType : "",
        type: formdetails.paymentType,
        amount: amount,
        cod_id: generatedpaymentid, //cod generated id
      });

      const result_payment = await payment.save();
      if (!result_payment) {
        const error = new Error(
          "Something went wrong saving payment on server"
        );
        error.statusCode = 400;
        throw error;
      }

      // console.log("Result Payment", result_payment);

      referenceid = result_payment.cod_id;

      order = new Order({
        email: email,
        contact: formdetails.contact.phoneno,
        paymentid: result_payment._id,
        items: cartItems,
        amount: Number(amount),
        shippingcost: 0,
        tax: 0,
        shipping_address: {
          full_name: formdetails.shippingaddress.fullname,
          address: formdetails.shippingaddress.address,
          city: formdetails.shippingaddress.city,
          state: formdetails.shippingaddress.addressstate,
          country: formdetails.shippingaddress.country,
          zip: formdetails.shippingaddress.pincode,
        },
        billing_address: {
          full_name: formdetails.billingaddress.fullname,
          address: formdetails.billingaddress.address,
          city: formdetails.billingaddress.city,
          state: formdetails.billingaddress.addressstate,
          country: formdetails.billingaddress.country,
          zip: formdetails.billingaddress.pincode,
        },
      });

      const result_order = await order.save();
      orderid = result_order._id;
    } else {
      const generatedpaymentid = uid();
      const payment = new Payment({
        customerid: existsemail[0]._id,
        gateway: formdetails.gatewayType ? formdetails.gatewayType : "",
        type: formdetails.paymentType,
        amount: amount,
        cod_id: generatedpaymentid,
      });

      const result_payment = await payment.save();

      if (!result_payment) {
        const error = new Error(
          "Something went wrong saving payment on server"
        );
        error.statusCode = 400;
        throw error;
      }

      // console.log("Result Payment", result_payment);
      referenceid = result_payment.cod_id;

      order = new Order({
        customerid: existsemail[0]._id,
        email: formdetails.contact.email,
        contact: formdetails.contact.phoneno,
        paymentid: result_payment._id,
        amount: Number(amount),
        items: cartItems,
        shippingcost: 0,
        tax: 0,
        shipping_address: {
          full_name: formdetails.shippingaddress.fullname,
          address: formdetails.shippingaddress.address,
          city: formdetails.shippingaddress.city,
          state: formdetails.shippingaddress.addressstate,
          country: formdetails.shippingaddress.country,
          zip: formdetails.shippingaddress.pincode,
        },
        billing_address: {
          full_name: formdetails.billingaddress.fullname,
          address: formdetails.billingaddress.address,
          city: formdetails.billingaddress.city,
          state: formdetails.billingaddress.addressstate,
          country: formdetails.billingaddress.country,
          zip: formdetails.billingaddress.pincode,
        },
      });

      const result_order = await order.save();
      orderid = result_order._id;

      //Update User orders list
      const updateUserOrders = await Customer.findOneAndUpdate(
        { _id: existsemail[0]._id },
        { $push: { orders: result_order._id } }
      );
      const result_updateUser = await updateUserOrders.save();
    }
    // Update Product Quantity after placed order
    cartItems.forEach(async (items) => {
      const existProduct = await ProductDetails.findOne({
        product_id: items.productid,
      });
      if (existProduct.quantity !== null) {
        existProduct.quantity = existProduct.quantity - items.quantity;
        await existProduct.save();
      }
    });

    res.status(200).json({
      redirectUrl: `${process.env.FRONTEND_URL}/orderpayment?reference=${referenceid}&orderid=${orderid}&status=successful`,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
