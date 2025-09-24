"use client";
import { useParams, useRouter } from "next/navigation";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVariantById, updateVariant } from "@/redux/slices/variantSlice";
=======
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVariantById, updateVariant } from "@/redux/slices/variantSlice";
const CloseIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const FormField = ({ label, type = "text", name, value, onChange, className = "" }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  </div>
);

const ImagePreview = ({ src, alt, onRemove, index }) => (
  <div className="relative group">
    <img
      src={src}
      alt={alt}
      className="w-24 h-24 object-cover rounded-lg"
      loading="lazy"
    />
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-80 group-hover:opacity-100"
      aria-label={`Remove ${alt}`}
    >
      <CloseIcon />
    </button>
  </div>
);
>>>>>>> completed

export default function EditVariant() {
  const router = useRouter();
  const { id, variantId } = useParams();
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { loading, error } = useSelector((state) => state.variant);
  const variants = useSelector((state) => state.variant.variant || {});
  console.log("Fetched Variant Data:", variants);

  const [formData, setFormData] = useState({
=======

  const { loading, error, variant: variants } = useSelector((state) => ({
    loading: state.variant?.loading || false,
    error: state.variant?.error || null,
    variant: state.variant?.variant || {}
  }));

  console.log("Fetched Variant Data:", variants);

  const initialFormState = useMemo(() => ({
>>>>>>> completed
    weight: "",
    mrp: "",
    discount: "",
    stock: "",
    isAvailable: true,
<<<<<<< HEAD
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Fetch variant details
  useEffect(() => {
    if (variantId) {
=======
  }), []);

  const [formData, setFormData] = useState(initialFormState);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (variantId && id) {
>>>>>>> completed
      dispatch(fetchVariantById({ productId: id, variantId }));
    }
  }, [variantId, id, dispatch]);

<<<<<<< HEAD
  // Update form data and existing images when variant loads
  useEffect(() => {
    if (variants) {
=======
  useEffect(() => {
    if (variants && Object.keys(variants).length > 0) {
>>>>>>> completed
      setFormData({
        weight: variants.weight || "",
        mrp: variants.mrp || "",
        discount: variants.discount || "",
        stock: variants.stock || "",
        isAvailable: variants.isAvailable ?? true,
      });
      setExistingImages(variants.images || []);
    }
  }, [variants]);

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        images: existingImages, // Include existing images
        newImages, // Include new images
      };
=======
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleRemoveExistingImage = useCallback((index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleRemoveNewImage = useCallback((index) => {
    setNewImages(prev => {

      const imageToRemove = prev[index];
      if (imageToRemove) {
        URL.revokeObjectURL(URL.createObjectURL(imageToRemove));
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleNewImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImages(prev => [...prev, ...files]);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      const updatedData = {
        ...formData,
        images: existingImages,
        newImages,
      };
      
>>>>>>> completed
      await dispatch(updateVariant({ productId: id, variantId, updatedData }));
      alert("Variant updated successfully!");
      router.push(`/admin/products/${id}`);
    } catch (error) {
      console.error("Error updating variant:", error);
      alert("Failed to update variant.");
    }
<<<<<<< HEAD
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
=======
  }, [formData, existingImages, newImages, dispatch, id, variantId, router]);

  useEffect(() => {
    return () => {
      newImages.forEach(image => {
        if (image instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(image));
        }
      });
    };
  }, [newImages]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-blue-500 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchVariantById({ productId: id, variantId }))}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
>>>>>>> completed

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Edit Variant</h2>
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">MRP</label>
              <input
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Availability</label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mt-2"
              />
            </div>
          </div>

          {/* Existing Images */}
          <div>
            <label className="block text-gray-700">Existing Images</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.length > 0 ? (
                existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Existing Image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No existing images found.</p>
              )}
            </div>
          </div>

          {/* New Images Upload */}
          <div>
            <label className="block text-gray-700">Upload New Images</label>
            <input
              type="file"
              multiple
              onChange={handleNewImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Update Variant
          </button>
=======
        
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <FormField
              label="MRP"
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
            />
            <FormField
              label="Discount (%)"
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
            <FormField
              label="Stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />

            <div className="sm:col-span-2">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Available</span>
              </label>
            </div>
          </div>

          <section>
            <h3 className="block text-gray-700 font-medium mb-2">Existing Images</h3>
            <div className="flex flex-wrap gap-3">
              {existingImages.length > 0 ? (
                existingImages.map((image, index) => (
                  <ImagePreview
                    key={`existing-${index}`}
                    src={image}
                    alt={`Existing Image ${index + 1}`}
                    onRemove={handleRemoveExistingImage}
                    index={index}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No existing images found.</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="block text-gray-700 font-medium mb-2">Upload New Images</h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleNewImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            {newImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {newImages.map((image, index) => (
                  <ImagePreview
                    key={`new-${index}`}
                    src={URL.createObjectURL(image)}
                    alt={`New Image ${index + 1}`}
                    onRemove={handleRemoveNewImage}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Variant
            </button>
          </div>
>>>>>>> completed
        </form>
      </div>
    </div>
  );
}