import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  urlParamsData: [],
  sortBy: "",
  minlocalPrice: 0,
  maxlocalPrice: 0,
};

const urlSlice = createSlice({
  name: "url-parameter",
  initialState: initalState,
  reducers: {
    reseturlparams: (state, action) => {
      state.urlParamsData = [];
      state.minlocalPrice = 0;
      state.maxlocalPrice = 0;
    },

    addurlparams: (state, action) => {
      //check whether attribute code exists in urlparamsdata(initalState)
      const existitem = state.urlParamsData.findIndex((data) =>
        Object.keys(data).includes(action.payload.attribute_code)
      );

      //if no then add new item of attribute code and inside of value are array of string based on select user input
      // [{ attribute_code: ["select 1", "select 2"]}]
      // for ex:- [{indoor-outdoor: ["Outdoor sunrise plants", "etc.."]}]
      if (existitem === -1) {
        const hasAttribute_code = true;
        let attribute_code = hasAttribute_code
          ? action.payload.attribute_code
          : null;
        let paramsArrayItem = {};
        paramsArrayItem[attribute_code] = [];
        paramsArrayItem[attribute_code].push(action.payload.item_value);
        state.urlParamsData.push(paramsArrayItem);
      } else {
        // Exists attribute_code, so will push user input value on that same attribute_code
        const existItem = state.urlParamsData[existitem];
        existItem[action.payload.attribute_code] = [
          ...existItem[action.payload.attribute_code],
          action.payload.item_value,
        ];
      }
    },

    removeurlparams: (state, action) => {
      const existitemIndex = state.urlParamsData.findIndex((data) =>
        Object.keys(data).includes(action.payload.attribute_code)
      );

      if (existitemIndex !== -1) {
        const existItem = state.urlParamsData[existitemIndex];
        if (existItem[action.payload.attribute_code].length === 1) {
          state.urlParamsData = state.urlParamsData.filter(
            (key, index) => index !== existitemIndex
          );
        } else {
          existItem[action.payload.attribute_code] = existItem[
            action.payload.attribute_code
          ].filter((params) => params !== action.payload.item_value);
        }
      }
    },

    addSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
    },

    addMinandMaxPrice: (state, action) => {
      state.minlocalPrice = action.payload.minPrice;
      state.maxlocalPrice = action.payload.maxPrice;
    },
  },
});

export const urlReduxActions = urlSlice.actions;
export default urlSlice.reducer;
