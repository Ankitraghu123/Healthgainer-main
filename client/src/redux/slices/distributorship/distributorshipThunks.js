import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD

// Base URL for your backend

const API_URL = "https://healthgainer-main.onrender.com/api/distributorship";


// CREATE
=======
const API_URL = "https://healthgainer-main.onrender.com/api/distributorship";

>>>>>>> completed
export const createForm = createAsyncThunk(
  "distributorship/createForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data.form; // return the created form
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

<<<<<<< HEAD
// READ ALL
=======
>>>>>>> completed
export const fetchForms = createAsyncThunk(
  "distributorship/fetchForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
<<<<<<< HEAD
      return response.data; // array of forms
=======
      return response.data;
>>>>>>> completed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

<<<<<<< HEAD
// READ ONE
=======
>>>>>>> completed
export const fetchFormById = createAsyncThunk(
  "distributorship/fetchFormById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

<<<<<<< HEAD
// UPDATE
=======
>>>>>>> completed
export const updateForm = createAsyncThunk(
  "distributorship/updateForm",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
<<<<<<< HEAD
      return response.data.form; // updated form
=======
      return response.data.form;
>>>>>>> completed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

<<<<<<< HEAD
// DELETE
=======
>>>>>>> completed
export const deleteForm = createAsyncThunk(
  "distributorship/deleteForm",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
<<<<<<< HEAD
      return id; // return deleted ID for reducer to remove
=======
      return id;
>>>>>>> completed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
