import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import cartServices from "./cartservices";

const initialState = {
	items: [],
	isChanged: false,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

export const userCart = createAsyncThunk("cart", async (id, thunkAPI) => {
	try {
		return await cartServices.fetchCartitemsByUser(id);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const updatePostCart = createAsyncThunk(
	"cart-update",
	async (params, thunkAPI) => {
		try {
			return await cartServices.postCartitemsbyUser(params.cartdata, params.id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);


const cartSlice = createSlice({
	name: "cart-reducer",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
			state.items = [];
			state.isChanged = false;
		},

		addItemstoCart: (state, action) => {
			const existsitems = state.items.findIndex(
				(item) => item._id === action.payload._id
			);

			state.isChanged = true;

			if (existsitems === -1) {
				state.items.push(action.payload);
			} else {
				const overwriteitem = state.items.find(
					(item) => item._id === action.payload._id
				);

				if (overwriteitem) {
					overwriteitem.quantity += 1;
				}
			}
		},

		modifycartItems: (state, action) => {
			const itemUpdate = state.items.find(
				(item) => item._id === action.payload._id
			);
			state.isChanged = true;
			if (itemUpdate && action.payload.method === "add") {
				itemUpdate.quantity += 1;
			} else if (itemUpdate && action.payload.method === "cut") {
				if (itemUpdate.quantity === 1) {
					const newcart = state.items.filter(
						(item) => item._id !== action.payload._id
					);
					state.items = newcart;
				}
				itemUpdate.quantity -= 1;
			}
		},

		removeCartItems: (state, action) => {
			const itemUpdate = state.items.find(
				(item) => item._id === action.payload
			);
			state.isChanged = true;
			if (itemUpdate) {
				const newUpdateCart = state.items.filter(
					(item) => item._id !== action.payload
				);
				state.items = newUpdateCart;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userCart.pending, (state) => {
				state.isLoading = true;
				state.isChanged = false;
			})
			.addCase(userCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.message = "";
				if (action.payload.data?.items.length > 0) {
					const fetchcart = action.payload.data?.items.map((item) => {
						return {
							_id: item.productid._id,
							productname: item.productid.productname,
							featuredimageUrl: item.productid.featuredimageUrl,
							price: item.productid.price,
							quantity: item.quantity,
						};
					});
					state.items = fetchcart;
				}
				state.isChanged = false;
			})
			.addCase(userCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
				state.items = [];
				state.isChanged = false;
			})
			.addCase(updatePostCart.pending, (state) => {
				state.isLoading = true;
				state.isChanged = false;
			})
			.addCase(updatePostCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.message = action.payload.message;
				state.isChanged = false;
			})
			.addCase(updatePostCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.message = action.payload;
				state.isChanged = false;
			});
	},
});

export const cartReduxActions = cartSlice.actions;
export default cartSlice.reducer;
