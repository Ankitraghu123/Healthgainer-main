import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";



// ✅ Fetch All Variants
export const fetchVariants = createAsyncThunk("variant/fetchVariants", async () => {
  const response = await API.get(`/variants/`);
  return response.data.variants;
});

// ✅ Create New Variant
export const createVariant = createAsyncThunk(
  "variant/createVariant",
  async ({ id, formData }) => {
    const response = await API.post(`/variants/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
    return response.data.variant;
  }
);

// ✅ Update Variant
export const updateVariant = createAsyncThunk("variant/updateVariant", async ({ productId,variantId, updatedData }) => {
  console.log(productId,variantId, updatedData );
  
  const response = await API.put(`/variants/${productId}/${variantId}`, updatedData ,{
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
    },
  });
  return response.data.variant;
});

// ✅ Delete Variant
export const deleteVariant = createAsyncThunk("variant/deleteVariant", async (id) => {
  console.log(id);
  
  await API.delete(`/variants/${id.productId}/${id.variantId}`);
  return id.variantId;
});

export const fetchVariantById = createAsyncThunk("variant/fetchVariantById", async (id) => {
  
  
  const response = await API.get(`/variants/${id.productId}/${id.variantId}`);
  return response.data.variant;
});

// ✅ Variant Slice
const variantSlice = createSlice({
  name: "variant",
  initialState: {
    variants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Variants
      .addCase(fetchVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variants = action.payload;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Variant
      .addCase(createVariant.fulfilled, (state, action) => {
        state.variants.push(action.payload);
      })

      // Update Variant
      .addCase(updateVariant.fulfilled, (state, action) => {
        const index = state.variants.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) {
          state.variants[index] = action.payload;
        }
      })

      // Delete Variant
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.variants = state.variants.filter((v) => v._id !== action.payload);
      })

      // Fetch Variant by ID
      .addCase(fetchVariantById.fulfilled, (state, action) => {
        state.variant = action.payload;
      });
  },
});

export default variantSlice.reducer;
