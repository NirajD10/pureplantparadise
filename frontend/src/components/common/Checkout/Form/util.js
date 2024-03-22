import * as z from "zod";

/* React hook form validation using Z validator*/

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const pincodeRegex = new RegExp(/^[1-9][0-9]{5}$/)

export const contactCheckoutFormSchema = z.object(
  {
    email: z.string().email({message: "Invalid email address"}),
  }
);

export const addressCheckoutFormSchema = z.object({
  phoneno: z.string({
    required_error: "Please enter phone number.",
  }).regex(phoneRegex, {message: "Invalid Phone number"}),
  shippingfullname: z.string().trim().min(1, {message: "Please enter receiver name"}),
  shippingaddress: z.string().trim().min(1, {message: "Please fill full address"}),
  shippingaddresscity: z.string({required_error: "Please enter city name"}).trim().min(1),
  shippingaddressstate: z.string({required_error: "Please enter state"}).trim().min(1),
  shippingaddresscountry: z.string({required_error: "Please select country"}).trim().min(1),
  shippingaddresspincode: z.string().regex(pincodeRegex, {message: "Please enter pincode of your address"}),
  billingfullname: z.string().trim().min(1, {message: "Please enter receiver name"}),
  billingaddress: z.string().trim().min(1, {message: "Please fill full address"}),
  billingaddresscity: z.string({required_error: "Please enter city name"}).trim().min(1),
  billingaddressstate: z.string({required_error: "Please enter state"}).trim().min(1),
  billingaddresscountry: z.string({required_error: "Please select country"}).trim().min(1),
  billingaddresspincode: z.string().regex(pincodeRegex, {message: "Please enter pincode of your address"}),
});

export const paymentCheckoutFormSchema = z.object({
  paymenttype: z.enum(["card", "cod"]),
  gateway: z.enum(["razorpay"], {invalid_type_error: "Please choose any one payment gateway"}).nullish()
});


