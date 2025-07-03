"use client";
import {
  FaUsers,
  FaBox,
  FaRupeeSign,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import { FiRefreshCw, FiArrowRight } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  totalRevenu,
  monthlyRevenu,
} from "@/redux/slices/orderSlice";
import { useState, useEffect } from "react";
import { getAllUsers } from "@/redux/slices/authSlice";
import { todayLogins } from "@/redux/slices/authSlice";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrderNotifications from "@/components/OrderNotifications";

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders || []);
  const revenu = useSelector((state) => state?.orders?.revenu || 0);
  const users = useSelector((state) => state?.auth?.users || []);
  const logins = useSelector((state) => state?.auth?.todayLogins || []);
  const monthlyRevenue = useSelector(
    (state) => state?.orders?.monthlyRevenue || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (monthlyRevenue && Array.isArray(monthlyRevenue)) {
      setChartData(
        monthlyRevenue.map((item) => ({
          name: item.month,
          sales: parseSales(item.total),
        }))
      );
    }
  }, []);

  const parseSales = (value) => {
    if (typeof value === "string") {
      if (value.includes("K")) {
        return parseFloat(value) * 1000;
      } else if (value.includes("Lakh")) {
        return parseFloat(value) * 100000;
      } else if (value.includes("Cr")) {
        return parseFloat(value) * 10000000;
      }
    }
    return parseFloat(value);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        dispatch(allOrders()),
        dispatch(getAllUsers()),
        dispatch(todayLogins()),
        dispatch(totalRevenu()),
        dispatch(monthlyRevenu()),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const recentOrders = orders.slice(0, 5).map((order) => ({
    id: `#${order.orderId}`,
    customer: order.userId?.firstName
      ? `${order.userId.firstName} ${order.userId.lastName}`
      : "Unknown",
    date: new Date(order.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: order.status,
    amount: `₹${order.totalAmount.toLocaleString("en-IN")}`,
    paymentStatus: order.paymentStatus,
    customerAvatar: order.userId?.profilePhoto,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
        };
      case "Processing":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
        };
      case "Shipped":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
        };
      case "Cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
        };
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
        };
      case "Pending":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
        };
      case "Failed":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
        };
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-xs'>
        <div className='max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Dashboard Overview
            </h1>
            <p className='text-sm text-gray-500'>
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <button className='p-2 rounded-full hover:bg-gray-100 relative'>
              {/* <FaBell className="text-gray-500" /> */}
              <OrderNotifications />
              {/* <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span> */}
            </button>
            <button
              onClick={refreshData}
              className={`flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ${
                isLoading ? "opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              <FiRefreshCw className={`${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
          <Link href='/admin/users'>
            <div className='bg-gradient-to-r from-blue-500 to-blue-600  rounded-xl shadow-xs border border-gray-100 overflow-hidden transition-all hover:shadow-sm hover:border-blue-100'>
              <div className='p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Total Customers
                    </p>
                    <p className='text-2xl font-semibold mt-1 text-gray-50'>
                      {users.length}
                    </p>
                    {/* <p className="text-xs text-gray-400 mt-1">+5 from yesterday</p> */}
                  </div>
                  <div className='p-3 rounded-lg bg-blue-50 text-blue-600'>
                    <FaUsers size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href='/admin/orders'>
            <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-xs border border-gray-100 overflow-hidden transition-all hover:shadow-sm hover:border-green-100'>
              <div className='p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Total Orders
                    </p>
                    <p className='text-2xl font-semibold mt-1 text-gray-50'>
                      {orders.length}
                    </p>
                    {/* <p className="text-xs text-gray-400 mt-1">+12% from last month</p> */}
                  </div>
                  <div className='p-3 rounded-lg bg-green-50 text-green-600'>
                    <FaBox size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-xs border border-gray-100 overflow-hidden transition-all hover:shadow-sm hover:border-purple-100'>
            <div className='p-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-white'>
                    Total Revenue
                  </p>
                  <p className='text-2xl font-semibold mt-1 text-gray-50'>
                    ₹{revenu.toLocaleString("en-IN")}
                  </p>
                  {/* <p className="text-xs text-gray-400 mt-1">+8% from last month</p> */}
                </div>
                <div className='p-3 rounded-lg bg-purple-50 text-purple-600'>
                  <FaRupeeSign size={20} />
                </div>
              </div>
            </div>
          </div>

          <Link href='/admin/today-login'>
            <div className='bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-xs border border-gray-100 overflow-hidden transition-all hover:shadow-sm hover:border-orange-100'>
              <div className='p-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-white'>
                      Today's Logins
                    </p>
                    <p className='text-2xl font-semibold mt-1 text-gray-50'>
                      {logins.length}
                    </p>
                    {/* <p className="text-xs text-gray-400 mt-1">Active users</p> */}
                  </div>
                  <div className='p-3 rounded-lg bg-orange-50 text-orange-600'>
                    <FaChartLine size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Revenue Chart */}
          <div className='bg-white rounded-xl shadow-xs border border-gray-100 p-6 lg:col-span-2'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Monthly Revenue
                </h3>
                <p className='text-sm text-gray-500'>
                  Revenue growth over time
                </p>
              </div>
              <div className='flex space-x-2'>
                <button className='px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg border border-blue-100'>
                  Monthly
                </button>
              </div>
            </div>
            <div className='h-80'>
              {chartData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id='colorSales'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#6366F1'
                          stopOpacity={0.2}
                        />
                        <stop
                          offset='95%'
                          stopColor='#6366F1'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey='name'
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={{ stroke: "#E5E7EB" }}
                    />
                    <YAxis
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      axisLine={{ stroke: "#E5E7EB" }}
                      tickLine={{ stroke: "#E5E7EB" }}
                      tickFormatter={(value) =>
                        `₹${value >= 1000 ? `${value / 1000}K` : value}`
                      }
                    />
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#F3F4F6'
                    />
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString("en-IN")}`,
                        "Revenue",
                      ]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type='monotone'
                      dataKey='sales'
                      stroke='#6366F1'
                      strokeWidth={2}
                      fillOpacity={1}
                      fill='url(#colorSales)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className='flex flex-col items-center justify-center h-full space-y-2'>
                  <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                    <FaChartLine className='text-gray-400' size={24} />
                  </div>
                  <p className='text-gray-500 text-sm'>
                    No revenue data available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className='bg-white rounded-xl shadow-xs border border-gray-100 p-6'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Recent Activity
                </h3>
                <p className='text-sm text-gray-500'>Today's user logins</p>
              </div>
              <Link
                href='/admin/today-login'
                className='text-sm text-blue-600 hover:text-blue-700 flex items-center'
              >
                View all <FiArrowRight className='ml-1' />
              </Link>
            </div>
            <div className='space-y-4'>
              {logins.slice(0, 4).map((login, index) => (
                <div
                  key={index}
                  className='flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0'
                >
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={login.profilePhoto} />
                    <AvatarFallback>
                      {login.firstName?.charAt(0)}
                      {login.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3 flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900'>
                        {login.firstName} {login.lastName}
                      </p>
                      <span className='text-xs text-gray-500'>
                        {new Date(login.lastLogin).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>{login.email}</p>
                  </div>
                </div>
              ))}
              {logins.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8'>
                  <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
                    <FaUsers className='text-gray-400' size={20} />
                  </div>
                  <p className='text-gray-500 text-sm'>
                    No recent activity today
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className='bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-100 flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Recent Orders
              </h3>
              <p className='text-sm text-gray-500'>Latest customer orders</p>
            </div>
            <Link
              href='/admin/orders'
              className='text-sm text-blue-600 hover:text-blue-700 flex items-center'
            >
              View all <FiArrowRight className='ml-1' />
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Order
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Customer
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Amount
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Status
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {recentOrders.map((order) => {
                  const statusColors = getStatusColor(order.status);
                  const paymentColors = getPaymentStatusColor(
                    order.paymentStatus
                  );
                  return (
                    <tr
                      key={order.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {order.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <Avatar className='h-8 w-8 mr-2'>
                            <AvatarImage src={order.customerAvatar} />
                            <AvatarFallback>
                              {order.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className='text-sm text-gray-900'>
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {order.date}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {order.amount}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} border ${statusColors.border}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${paymentColors.bg} ${paymentColors.text} border ${paymentColors.border}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan='6' className='px-6 py-8 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
                          <FaBox className='text-gray-400' size={20} />
                        </div>
                        <p className='text-gray-500'>No orders found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {recentOrders.length > 0 && (
            <div className='px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between'>
              <div className='text-sm text-gray-500'>
                Showing <span className='font-medium'>1</span> to{" "}
                <span className='font-medium'>
                  {Math.min(5, orders.length)}
                </span>{" "}
                of <span className='font-medium'>{orders.length}</span> orders
              </div>
              <div className='flex space-x-2'>
                <button className='px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100'>
                  Previous
                </button>
                <button className='px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100'>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
