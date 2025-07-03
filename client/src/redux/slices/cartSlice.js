import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";

const API_URL = "http://localhost:5000/cart";

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/cart`);
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error fetching cart");
  }
});

// ✅ Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, variantId, quantity }, { rejectWithValue }) => {
  try {
    const response = await API.post(`/cart/add`, {  productId, variantId, quantity });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error adding to cart");
  }
});

// ✅ Remove from Cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ variantId }, { rejectWithValue }) => {
      try {
        const response = await API.post(`/cart/remove`, { variantId });
        return response.data.cart;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error removing from cart");
      }
    }
  );
  

// ✅ Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ variantId, quantity }, { rejectWithValue }) => {
      try {
        const response = await API.post(`/cart/update`, { variantId, quantity });
        return response.data.cart;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error updating cart");
      }
    }
  );
  

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export default cartSlice.reducer;
