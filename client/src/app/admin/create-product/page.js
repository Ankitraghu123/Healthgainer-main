

"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/redux/slices/productSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    mrp: "",
    discount: "",
    stock: "",
    images: [],
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setProductData({ ...productData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("name", productData.name);
    formDataToSubmit.append("description", productData.description);
    formDataToSubmit.append("category", productData.category);
    formDataToSubmit.append("mrp", productData.mrp);
    formDataToSubmit.append("discount", productData.discount);
    formDataToSubmit.append("stock", productData.stock);

    if (productData.images) {
      for (let i = 0; i < productData.images.length; i++) {
        formDataToSubmit.append("images", productData.images[i]);
      }
    }

    try {
      const resultAction = await dispatch(createProduct(formDataToSubmit)).unwrap();
      console.log(resultAction, "resultAction");

      if (resultAction.success) {
        toast.success("Product created successfully!");
        setProductData({
          name: "",
          description: "",
          category: "",
          mrp: "",
          discount: "",
          stock: "",
          images: [],
        });
        router.push("/admin/products");
      } else {
        toast.error(resultAction.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create product!");
      console.log(error, "error2");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-5 rounded-lg shadow-lg">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      {success && (
        <p className="text-green-500">
          {typeof success === "object" ? success.message : success}
        </p>
      )}
      {error && (
        <p className="text-red-500">
          {typeof error === "object" ? error.message : error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="number"
          name="mrp"
          placeholder="MRP"
          value={productData.mrp}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          value={productData.discount}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="w-full p-2 border mb-2"
        />

        <button
          type="submit"
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-primary"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

