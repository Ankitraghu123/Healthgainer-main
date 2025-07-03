"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiMoreVertical } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";
import { fetchProducts,deleteProduct } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaEye, FaSort, FaTrash } from "react-icons/fa";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle Search
  const filteredProducts = productsData?.products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery.toLowerCase())
  );

  // Handle Sorting
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; // ❌ If user cancels, stop here
  
    try {
      const result = await dispatch(deleteProduct(productId));
      console.log(result);
      
  
      // ✅ Check if the deletion was successful
      if (deleteProduct.fulfilled.match(result)) {
        toast.success("Product deleted successfully");
        dispatch(fetchProducts()); // ✅ Fetch products only if delete was successful
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Something went wrong while deleting");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-6 px-2 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">Products</h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button className="flex items-center bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 w-full md:w-auto">
            <BsDownload className="mr-2" /> Export
          </button>
          <Link href="/admin/create-product">
            <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto">
              <FiPlus className="mr-2" /> Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center w-32">
                    Name <FaSort className="ml-1 text-sm" />
                  </div>
                </th>
                {/* <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status <FaSort className="ml-1 text-sm" />
                  </div>
                </th> */}
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("mrp")}
                >
                  <div className="flex items-center">
                    MRP <FaSort className="ml-1 text-sm" />
                  </div>
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    Price <FaSort className="ml-1 text-sm" />
                  </div>
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center">
                    Stock <FaSort className="ml-1 text-sm" />
                  </div>
                </th>
                {/* <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Created at <FaSort className="ml-1 text-sm" />
                  </div>
                </th> */}
                <th className="p-3 text-left">Add Variant</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 flex items-center space-x-2 w-64">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <span>{product.name}</span>
                    </td>
                    {/* <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${product.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {product.status}
                      </span>
                    </td> */}
                    <td className="p-3">{product.mrp}</td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3">{product.stock}</td>
                    {/* <td className="p-3">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td> */}
                    <td className="p-3">
                      <Link href={`/admin/add-variant/${product._id}`}>
                        <button className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                          Add Variant
                        </button>
                      </Link>
                    </td>
                    <td className="  md:space-x-3  gap-4 h-full ">
                      {/* View Button */}
                      <Link href={`/admin/products/${product._id}`}>
                        <button
                          aria-label="View Product"
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        >
                          <FaEye size={20} />
                        </button>
                      </Link>

                      {/* Delete Button */}
                      <button
                        aria-label="Delete Product"
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FaTrash size={20} />
                      </button>

                      {/* Edit Button */}
                      <Link href={`/admin/edit-product/${product._id}`}>
                        <button
                          aria-label="Edit Product"
                          className="text-green-500 hover:text-green-700 transition-colors duration-200"
                        >
                          <FaEdit size={20} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-3 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className="text-sm text-gray-600 mb-4 md:mb-0">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} products
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}