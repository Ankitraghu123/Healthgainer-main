import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../lib/api";

// Fetch all addresses
export const fetchAddresses = createAsyncThunk(
  'address/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/addresses/');
      return response.data; // Returns {success: true, addresses: [...]}
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
    }
  }
);

// Add new address
export const addAddress = createAsyncThunk(
  'address/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post('/addresses/add/', data);
      return response.data; // Returns the added address
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add address');
    }
  }
);

// Update address
export const updateAddress = createAsyncThunk(
  'address/update',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/addresses/update/${id}`, data);
      return response.data; // Returns the updated address
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update address');
    }
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  'address/delete',
  async (addressId, { rejectWithValue }) => {
    try {
      await API.delete(`/addresses/delete/${addressId}`);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete address');
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(a => a._id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAddressError } = addressSlice.actions;
export default addressSlice.reducer;