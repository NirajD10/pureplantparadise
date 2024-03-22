import {createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

function userAuthStatus() {
  const token = localStorage.getItem("token");
  if (token === null) {
    return null;
  }
  const decoded = jwtDecode(token);
  return {
    email: decoded.email,
  };
}

const initialState = {
  contactFormDetails: {email: '', phoneno: ''},
  shippingAddressFormDetails: {
    fullname: "",
    address: "",
    city: "",
    addressstate: "",
    country: "",
    pincode: ""
  },
  billingAddressFormDetails: {},
  totalamount: 0,
  totalqty: 0,
  checkoutformStage: 1
}


const checkoutSlice = createSlice({
  name: "checkout-reducer",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.contactFormDetails = {email: '', phoneno: ''},
      state.shippingAddressFormDetails = {
          fullname: "",
          address: "",
          city: "",
          addressstate: "",
          country: "",
          pincode: ""
      },
    state.billingAddressFormDetails = {},
    state.totalamount = 0,
    state.totalqty = 0,
    state.checkoutformStage =  1
    },

    contactFormProcess: (state, action) => {
      if(!action.payload.email) {
        return;
      }
      const user = userAuthStatus();
      if (user !== null) {
        state.isContactDetailsExits = true;
        state.contactFormDetails = {
          ...state.contactFormDetails,
          email: user?.email
        }
        state.checkoutformStage = 2
      } else {
        state.contactFormDetails = {
          ...state.contactFormDetails,
          email: action.payload.email
        }
        state.checkoutformStage = 2
      }
    },

    addressFormProcess: (state, action) => {
      state.contactFormDetails = {
        ...state.contactFormDetails,
        phoneno: action.payload.data.phoneno
      }
      state.shippingAddressFormDetails = {
        fullname: action.payload.data.shippingfullname,
        address: action.payload.data.shippingaddress,
        city: action.payload.data.shippingaddresscity,
        addressstate: action.payload.data.shippingaddressstate,
        country: action.payload.data.shippingaddresscountry,
        pincode: action.payload.data.shippingaddresspincode
      }
      state.billingAddressFormDetails = {
          fullname: action.payload.data.billingfullname,
          address: action.payload.data.billingaddress,
          city: action.payload.data.billingaddresscity,
          addressstate: action.payload.data.billingaddressstate,
          country: action.payload.data.billingaddresscountry,
          pincode: action.payload.data.billingaddresspincode
      }
      state.checkoutformStage = 3
    },

    updateItemAmountandQty: (state, action) => {
      state.totalamount = action.payload.totalamount,
      state.totalqty = action.payload.totalqty
    }
  },
});

export const checkoutReduxActions = checkoutSlice.actions;
export default checkoutSlice.reducer;
