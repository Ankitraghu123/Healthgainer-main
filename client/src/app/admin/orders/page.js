"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaSort, FaFileExport, FaTimes, FaSpinner,FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { allOrders, updateOrderStatus } from "@/redux/slices/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders || []);
  const { loading, error } = useSelector((state) => state?.orders || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (order) =>
      order?.userId?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?._id?.toString().includes(searchQuery) ||
      order?.status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Function to update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus }));
      dispatch(allOrders()); // Refresh orders after status update
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
        <button
          onClick={() => dispatch(allOrders())}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Search and Export Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200 w-full md:w-auto">
          <FaFileExport className="mr-2" />
          Export
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("orderNumber")}>
                <div className="flex items-center">
                  Order Number <FaSort className="ml-1 text-sm" />
                </div>
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("_id")}>
                <div className="flex items-center">
                  Order ID <FaSort className="ml-1 text-sm" />
                </div>
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("userId.firstName")}>
                <div className="flex items-center">
                  Customer <FaSort className="ml-1 text-sm" />
                </div>
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("totalAmount")}>
                <div className="flex items-center">
                  Total <FaSort className="ml-1 text-sm" />
                </div>
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">
                  Status <FaSort className="ml-1 text-sm" />
                </div>
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-3">{order.orderNumber}</td>
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order?.userId?.firstName + " " + order?.userId?.lastName}</td>
                  <td className="p-3">₹{order.totalAmount}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-black text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-colors duration-200"
                    >
                      <FaEye />
                    </button>
                    {/* <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200">
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedOrders.length)} of {sortedOrders.length} orders
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-2xl" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedOrder.userId.firstName} {selectedOrder.userId.lastName}</p>
                  <p><strong>Email:</strong> {selectedOrder.userId.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.userId.mobileNumber}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item._id} className="border p-4 rounded-lg">
                      <p><strong>Product:</strong> {item?.productId?.name}</p>
                      {/* <p><strong>Variant:</strong> {item.variantId}</p> */}
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Price:</strong> ₹{item.price}</p>
                      <p><strong>Weight:</strong> {item?.productId?.variants?.find((v) => v._id === item.variantId)?.weight}</p>
                      <div className="flex gap-2 mt-2">
                        {item?.productId?.variants
                          ?.find((v) => v._id === item.variantId)
                          ?.images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Variant ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                <div className="space-y-2">
                  <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <div className="space-y-2">
                  <p><strong>Full Name:</strong> {selectedOrder.address.fullName}</p>
                  <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
                  <p><strong>Street:</strong> {selectedOrder.address.street}</p>
                  <p><strong>City:</strong> {selectedOrder.address.city}</p>
                  <p><strong>State:</strong> {selectedOrder.address.state}</p>
                  <p><strong>Zip Code:</strong> {selectedOrder.address.zipCode}</p>
                  <p><strong>Country:</strong> {selectedOrder.address.country}</p>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Status</h3>
                <p>{selectedOrder.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}