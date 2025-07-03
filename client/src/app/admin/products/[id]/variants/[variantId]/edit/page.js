"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVariantById, updateVariant } from "@/redux/slices/variantSlice";

export default function EditVariant() {
  const router = useRouter();
  const { id, variantId } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.variant);
  const variants = useSelector((state) => state.variant.variant || {});
  console.log("Fetched Variant Data:", variants);

  const [formData, setFormData] = useState({
    weight: "",
    mrp: "",
    discount: "",
    stock: "",
    isAvailable: true,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Fetch variant details
  useEffect(() => {
    if (variantId) {
      dispatch(fetchVariantById({ productId: id, variantId }));
    }
  }, [variantId, id, dispatch]);

  // Update form data and existing images when variant loads
  useEffect(() => {
    if (variants) {
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
      await dispatch(updateVariant({ productId: id, variantId, updatedData }));
      alert("Variant updated successfully!");
      router.push(`/admin/products/${id}`);
    } catch (error) {
      console.error("Error updating variant:", error);
      alert("Failed to update variant.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Edit Variant</h2>
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
        </form>
      </div>
    </div>
  );
}