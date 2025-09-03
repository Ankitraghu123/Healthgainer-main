

"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { createVariant } from "@/redux/slices/variantSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    formData.append("mrp", variantData.mrp);
    formData.append("discount", variantData.discount);
    formData.append("stock", variantData.stock);
    formData.append("isAvailable", variantData.isAvailable);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await dispatch(createVariant({ id, formData })).unwrap();
      toast.success("Variant created successfully!");
      router.push(`/admin/products/${id}`);
    } catch (error) {
      console.error("Failed to create variant:", error);
      toast.error("Failed to create variant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-6">
        Add Variant for Product ID: {id}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
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
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

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
