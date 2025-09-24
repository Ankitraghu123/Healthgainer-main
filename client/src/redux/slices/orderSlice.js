import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/api";

<<<<<<< HEAD
// ✅ User ke orders fetch karne ka function
=======
>>>>>>> completed
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (userId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/orders`);
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const fetchOrderByUserId = createAsyncThunk("orders/fetchOrderByUserId", async (userId, { rejectWithValue }) => {
  try {
    const response = await API.get(`/orders/`);
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

<<<<<<< HEAD
// ✅ New order place karne ka function
=======
>>>>>>> completed
export const placeOrder = createAsyncThunk("orders/placeOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await API.post("/orders/place", orderData);
    return response.data.order;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

<<<<<<< HEAD
// ✅ Order status update karne ka function (Admin)
=======
>>>>>>> completed
export const updateOrderStatus = createAsyncThunk("orders/updateOrderStatus", async ({ orderId, status }, { rejectWithValue }) => {
  try {
    const response = await API.put("/orders/update", { orderId, status });
    return response.data.order;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const allOrders = createAsyncThunk("orders/allOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/orders/all");
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const totalRevenu = createAsyncThunk("orders/totalRevenu", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/orders/revenu");
<<<<<<< HEAD
    return response.data.totalRevenue; // ✅ सही किया
=======
    return response.data.totalRevenue;
>>>>>>> completed
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const monthlyRevenu = createAsyncThunk("orders/monthly-revenu", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/orders/monthly-revenu");
<<<<<<< HEAD
    return response.data.monthlyRevenue; // ✅ सही किया
=======
    return response.data.monthlyRevenue;
>>>>>>> completed
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    revenu: 0,
    monthlyRevenue: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
      // ✅ Orders Fetching
=======
>>>>>>> completed
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ Order Placing
=======
>>>>>>> completed
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ Order Status Update
=======
>>>>>>> completed
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ All Orders Fetching
=======
>>>>>>> completed
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ Total Revenu
=======
>>>>>>> completed
      .addCase(totalRevenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(totalRevenu.fulfilled, (state, action) => {
        state.loading = false;
        state.revenu = action.payload;
      })
      .addCase(totalRevenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ Order By User Id
=======
>>>>>>> completed
      .addCase(fetchOrderByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

<<<<<<< HEAD
      // ✅ Monthly Revenu
=======
>>>>>>> completed
      .addCase(monthlyRevenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(monthlyRevenu.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyRevenue = action.payload;
      })
      .addCase(monthlyRevenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
<<<<<<< HEAD
      
      
=======
>>>>>>> completed
  },
});

export default orderSlice.reducer;
