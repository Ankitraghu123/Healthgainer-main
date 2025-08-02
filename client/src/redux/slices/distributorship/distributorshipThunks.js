import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Base URL for your backend
const API_URL = "https://healthgainer-main.onrender.com/api/distributorship";

// CREATE
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

// READ ALL
export const fetchForms = createAsyncThunk(
  "distributorship/fetchForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // array of forms
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// READ ONE
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

// UPDATE
export const updateForm = createAsyncThunk(
  "distributorship/updateForm",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data.form; // updated form
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE
export const deleteForm = createAsyncThunk(
  "distributorship/deleteForm",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; // return deleted ID for reducer to remove
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
