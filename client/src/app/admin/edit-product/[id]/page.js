"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, updateProduct } from "@/redux/slices/productSlice";
import { toast } from "react-toastify";

export default function EditProduct() {
    const router = useRouter();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state?.product?.product || []);

    const [formData, setFormData] = useState({
        name: "",
        status: "Active",
        mrp: "",
        discount: "",
        stock: "",
        description: "",
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                status: product.status || "Active",
                mrp: product.mrp || "",
                discount: product.discount || "",
                stock: product.stock || "",
                description: product.description || "",
            });
            setExistingImages(product.images || []);
        }
    }, [product]);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("id", id);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("status", formData.status);
            formDataToSend.append("mrp", formData.mrp);
            formDataToSend.append("discount", formData.discount);
            formDataToSend.append("stock", formData.stock);
            formDataToSend.append("description", formData.description);
    
            existingImages.forEach((image, index) => {
                formDataToSend.append(`existingImages[${index}]`, image);
            });
    
            newImages.forEach((file, index) => {
                formDataToSend.append(`newImages`, file);
            });
            console.log("Sending data:", Object.fromEntries(formDataToSend.entries()));
            const response = await dispatch(updateProduct(formDataToSend)).unwrap(); // `.unwrap()` ensures proper error handling
            console.log("API Response:", response); // Debugging API response
    
            toast.success("Product updated successfully!");
            router.push("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(error || "Failed to update product.");
            console.log(error);
            
        } finally {
            setIsSubmitting(false);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
            {product && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">MRP</label>
                        <input
                            type="number"
                            name="mrp"
                            value={formData.mrp}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">discount</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Existing Images</label>
                        <div className="flex flex-wrap gap-2">
                            {existingImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image} alt={`Product Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => setExistingImages(existingImages.filter((_, i) => i !== index))}
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Upload New Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setNewImages([...e.target.files])}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {newImages.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={URL.createObjectURL(image)} alt={`New Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => setNewImages(newImages.filter((_, i) => i !== index))}
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
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
                    >
                        {isSubmitting ? "Updating..." : "Update Product"}
                    </button>
                </form>
            )}
        </div>
    );
}