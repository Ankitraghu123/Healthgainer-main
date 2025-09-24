<<<<<<< HEAD


"use client";
import { useState } from "react";
=======
"use client";
import { useState, useCallback } from "react";
>>>>>>> completed
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { createVariant } from "@/redux/slices/variantSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
export default function AddVariant() {
  const { id } = useParams(); // Get the product ID from the URL
  const router = useRouter();
  const dispatch = useDispatch();

  const [variantData, setVariantData] = useState({
    weight: "",
    mrp: 0,
    discount: 0,
    stock: 0,
    isAvailable: true,
  });

  const [images, setImages] = useState([]); // Store File objects
  const [imagePreview, setImagePreview] = useState([]); // Store image preview URLs
  const [loading, setLoading] = useState(false); // Button loading state

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariantData({ ...variantData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previewUrls);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("weight", variantData.weight);
=======
const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 3000
};

const INITIAL_VARIANT_DATA = {
  weight: "",
  mrp: 0,
  discount: 0,
  stock: 0,
  isAvailable: true,
};

export default function AddVariant() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [variantData, setVariantData] = useState(INITIAL_VARIANT_DATA);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setVariantData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreview(previewUrls);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!variantData.weight.trim() || variantData.mrp <= 0) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("weight", variantData.weight.trim());
>>>>>>> completed
    formData.append("mrp", variantData.mrp);
    formData.append("discount", variantData.discount);
    formData.append("stock", variantData.stock);
    formData.append("isAvailable", variantData.isAvailable);

<<<<<<< HEAD
    images.forEach((image) => {
      formData.append("images", image);
    });
=======
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
>>>>>>> completed

    try {
      await dispatch(createVariant({ id, formData })).unwrap();
      toast.success("Variant created successfully!");
<<<<<<< HEAD
      router.push(`/admin/products/${id}`);
    } catch (error) {
      console.error("Failed to create variant:", error);
      toast.error("Failed to create variant. Please try again.");
=======

      imagePreview.forEach(url => URL.revokeObjectURL(url));
      router.push(`/admin/products/${id}`);
    } catch (error) {
      console.error("Failed to create variant:", error);
      toast.error(error.message || "Failed to create variant. Please try again.");
>>>>>>> completed
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
=======
  const inputFields = [
    {
      label: "Weight",
      name: "weight",
      type: "text",
      required: true,
      placeholder: "e.g., 500g, 1kg"
    },
    {
      label: "MRP",
      name: "mrp",
      type: "number",
      required: true,
      min: 0,
      step: "0.01"
    },
    {
      label: "Discount (%)",
      name: "discount",
      type: "number",
      required: false,
      min: 0,
      max: 100
    },
    {
      label: "Stock",
      name: "stock",
      type: "number",
      required: true,
      min: 0
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer {...TOAST_CONFIG} />
      
>>>>>>> completed
      <h2 className="text-2xl font-semibold mb-6">
        Add Variant for Product ID: {id}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
<<<<<<< HEAD
        <div className="grid grid-cols-2 gap-4">
          {/* Weight */}
          <div>
            <label className="block text-gray-700">Weight</label>
            <input
              type="text"
              name="weight"
              value={variantData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* MRP */}
          <div>
            <label className="block text-gray-700">MRP</label>
            <input
              type="number"
              name="mrp"
              value={variantData.mrp}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={variantData.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={variantData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700">Upload Images</label>
=======
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 mb-1 font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={variantData[field.name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required={field.required}
                min={field.min}
                max={field.max}
                step={field.step}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Upload Images <span className="text-red-500">*</span>
            </label>
>>>>>>> completed
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
<<<<<<< HEAD
              className="w-full p-2 border border-gray-300 rounded-lg"
=======
              className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
>>>>>>> completed
              required
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Image Preview */}
        {imagePreview.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
            <div className="flex flex-wrap gap-4">
              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Submitting..." : "Add Variant"}
        </button>
      </form>
    </div>
  );
}
=======
        {imagePreview.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Image Preview:</h3>
            <div className="flex flex-wrap gap-3">
              {imagePreview.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {imagePreview.length} image(s) selected
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 min-w-[120px] ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Add Variant"
            )}
          </button>
          
          <button
            type="button"
            onClick={() => router.push(`/admin/products/${id}`)}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
>>>>>>> completed
