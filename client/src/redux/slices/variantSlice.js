import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";

<<<<<<< HEAD


// ✅ Fetch All Variants
=======
>>>>>>> completed
export const fetchVariants = createAsyncThunk("variant/fetchVariants", async () => {
  const response = await API.get(`/variants/`);
  return response.data.variants;
});

<<<<<<< HEAD
// ✅ Create New Variant
=======
>>>>>>> completed
export const createVariant = createAsyncThunk(
  "variant/createVariant",
  async ({ id, formData }) => {
    const response = await API.post(`/variants/${id}`, formData, {
      headers: {
<<<<<<< HEAD
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
=======
        "Content-Type": "multipart/form-data",
>>>>>>> completed
      },
    });
    return response.data.variant;
  }
);

<<<<<<< HEAD
// ✅ Update Variant
=======
>>>>>>> completed
export const updateVariant = createAsyncThunk("variant/updateVariant", async ({ productId,variantId, updatedData }) => {
  console.log(productId,variantId, updatedData );
  
  const response = await API.put(`/variants/${productId}/${variantId}`, updatedData ,{
    headers: {
<<<<<<< HEAD
      "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
=======
      "Content-Type": "multipart/form-data",
>>>>>>> completed
    },
  });
  return response.data.variant;
});

<<<<<<< HEAD
// ✅ Delete Variant
=======
>>>>>>> completed
export const deleteVariant = createAsyncThunk("variant/deleteVariant", async (id) => {
  console.log(id);
  
  await API.delete(`/variants/${id.productId}/${id.variantId}`);
  return id.variantId;
});

export const fetchVariantById = createAsyncThunk("variant/fetchVariantById", async (id) => {
  
  
  const response = await API.get(`/variants/${id.productId}/${id.variantId}`);
  return response.data.variant;
});

<<<<<<< HEAD
// ✅ Variant Slice
=======
>>>>>>> completed
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
<<<<<<< HEAD
      // Fetch Variants
=======
>>>>>>> completed
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

<<<<<<< HEAD
      // Create Variant
=======
>>>>>>> completed
      .addCase(createVariant.fulfilled, (state, action) => {
        state.variants.push(action.payload);
      })

<<<<<<< HEAD
      // Update Variant
=======
>>>>>>> completed
      .addCase(updateVariant.fulfilled, (state, action) => {
        const index = state.variants.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) {
          state.variants[index] = action.payload;
        }
      })

<<<<<<< HEAD
      // Delete Variant
=======
>>>>>>> completed
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.variants = state.variants.filter((v) => v._id !== action.payload);
      })

<<<<<<< HEAD
      // Fetch Variant by ID
=======
>>>>>>> completed
      .addCase(fetchVariantById.fulfilled, (state, action) => {
        state.variant = action.payload;
      });
  },
});

export default variantSlice.reducer;
