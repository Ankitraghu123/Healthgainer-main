import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";

// Async thunk to create a product (with multipart/form-data)
export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    
    try {
      const response = await API.post(`/products/`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (updatedProduct, { rejectWithValue }) => {
    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of updatedProduct.entries()) {
      console.log(key, value);
    }

    try {
      const response = await API.put(`/products/${updatedProduct.get("id")}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating product");
    }
  }
);


export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (!Array.isArray(state.products)) {
          state.products = [];  // Reset to an empty array if it was null/undefined
        }
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.products = Array.isArray(action.payload) ? action.payload : [];
      // })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (!Array.isArray(state.products)) {
          state.products = []; // ✅ Ensure state.products is always an array
        }
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
      // .addCase(deleteProduct.fulfilled, (state, action) => {
      //   state.products = state.products.filter((product) => product._id !== action.payload);
      // })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
            const index = state.products.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        } else {
            state.products = action.payload; // Update single product
        }
    })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });
  },
});

export const { clearSuccess } = productSlice.actions;
export default productSlice.reducer;
