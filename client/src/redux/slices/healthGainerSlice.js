import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";



// ✅ Fetch all Health Gainers
export const fetchHealthGainers = createAsyncThunk("healthGainer/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/healthgainer");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Fetch Health Gainer by Product ID
export const fetchHealthGainerByProduct = createAsyncThunk("healthGainer/fetchByProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/healthgainer/product/${productId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Create a new Health Gainer
export const createHealthGainer = createAsyncThunk("healthGainer/create", async (data, { rejectWithValue }) => {
  try {
    const response = await API.post("/healthgainer", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Update Health Gainer
export const updateHealthGainer = createAsyncThunk("healthGainer/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await API.put(`/healthgainer/${id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ✅ Delete Health Gainer
export const deleteHealthGainer = createAsyncThunk("healthGainer/delete", async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/healthgainer/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 🎯 Initial State
const initialState = {
  healthGainers: [],
  loading: false,
  error: null,
};

const healthGainerSlice = createSlice({
  name: "healthGainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All
      .addCase(fetchHealthGainers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHealthGainers.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGainers = action.payload;
      })
      .addCase(fetchHealthGainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch by Product
      .addCase(fetchHealthGainerByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHealthGainerByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGainers = [action.payload];
      })
      .addCase(fetchHealthGainerByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Create
      .addCase(createHealthGainer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHealthGainer.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGainers.push(action.payload);
      })
      .addCase(createHealthGainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update
      .addCase(updateHealthGainer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHealthGainer.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGainers = state.healthGainers.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateHealthGainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete
      .addCase(deleteHealthGainer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHealthGainer.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGainers = state.healthGainers.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteHealthGainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default healthGainerSlice.reducer;
