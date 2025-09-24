import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/lib/api";

const BASE_URL = "/why/advantages";

<<<<<<< HEAD
// ✅ Fetch all advantages
=======
>>>>>>> completed
export const fetchAdvantages = createAsyncThunk("advantage/fetchAll", async () => {
  const res = await API.get(BASE_URL);
  return res.data.advantages;
});

<<<<<<< HEAD
// ✅ Create new advantage
=======
>>>>>>> completed
export const createAdvantage = createAsyncThunk("advantage/create", async (formData) => {
  const res = await API.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.advantage;
});

<<<<<<< HEAD
// ✅ Update advantage
=======
>>>>>>> completed
export const updateAdvantage = createAsyncThunk("advantage/update", async ({ id, formData }) => {
  const res = await API.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.advantage;
});

<<<<<<< HEAD
// ✅ Delete advantage
=======
>>>>>>> completed
export const deleteAdvantage = createAsyncThunk("advantage/delete", async (id) => {
  await API.delete(`${BASE_URL}/${id}`);
  return id;
});

const advantageSlice = createSlice({
  name: "advantage",
  initialState: {
    advantages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvantages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdvantages.fulfilled, (state, action) => {
        state.loading = false;
        state.advantages = action.payload;
      })
      .addCase(fetchAdvantages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createAdvantage.fulfilled, (state, action) => {
        state.advantages.push(action.payload);
      })
      .addCase(updateAdvantage.fulfilled, (state, action) => {
        state.advantages = state.advantages.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })
      .addCase(deleteAdvantage.fulfilled, (state, action) => {
        state.advantages = state.advantages.filter((a) => a._id !== action.payload);
      });
  },
});

export default advantageSlice.reducer;
