// "use client";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { fetchAddresses } from "@/redux/slices/addressSlice";
// import { FaTag } from "react-icons/fa";
// import AddressSection from "@/components/AddressSection";
// import axios from "@/lib/api";

// const CheckoutPage = () => {
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [coupon, setCoupon] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [orderNote, setOrderNote] = useState("");

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const cartItems = useSelector((state) => state.cart.items || []);
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       router.push("/cart");
//     }
//   }, [cartItems, router]);

//   // Totals
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const totalMRP = cartItems.reduce(
//     (acc, item) => acc + item.mrp * item.quantity,
//     0
//   );
//   const productDiscount = totalMRP - subtotal;
//   const total = subtotal - couponDiscount;

//   const handleApplyCoupon = () => {
//     if (coupon === "SAVE10") {
//       setCouponDiscount(subtotal * 0.1);
//       setCouponApplied(true);
//     } else {
//       setCouponDiscount(0);
//       setCouponApplied(false);
//     }
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async ({ amount, user, onSuccess }) => {
//     const isSDKLoaded = await loadRazorpayScript();
//     if (!isSDKLoaded) {
//       alert("Failed to load Razorpay SDK");
//       return;
//     }

//     try {
//       // ✅ 1. Create order on server
//       const { data } = await axios.post("/payment/order", {
//         amount,
//         items: cartItems,
//         addressId: selectedAddress._id,
//         note: orderNote,
//       });
//       const createdOrderId = data.order.id; // 🆗 Order ID from server
//       const mongoOrderId = data.order.mongoOrderId; // 🆗 Order ID from server

//       const options = {
//         key: "rzp_test_ZckjTyZsXhMpzT",
//         amount: data.order.amount,
//         order_id: createdOrderId,
//         handler: async function (response) {
//           try {
//             // ✅ 2. Verify payment
//             const verifyRes = await axios.post("/payment/verify", {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             if (verifyRes.data.success) {
//               // ✅ 3. Pass orderId back
//               onSuccess(mongoOrderId);
//             } else {
//               alert("Payment verification failed");
//             }
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             alert("Payment verification error");
//           }
//         },
//         prefill: {
//           name: user?.name,
//           email: user?.email,
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert("Something went wrong while placing the order.");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select a shipping address");
//       return;
//     }

//     await handlePayment({
//       amount: total,
//       user,
//       onSuccess: (orderId) => {
//         // ✅ Pass orderId to confirmation page
//         console.log(orderId, "SBSBSBSB");
//         router.push(`/orderConfirmation/${orderId}`);
//       },
//     });
//   };

//   return (
//     <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-6xl mx-auto'>
//         <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
//           Checkout
//         </h1>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           <div className='lg:col-span-2 space-y-8'>
//             <AddressSection
//               selectedAddress={selectedAddress}
//               setSelectedAddress={setSelectedAddress}
//             />

//             <div className='bg-white p-6 rounded-lg shadow'>
//               <h2 className='text-lg font-semibold mb-4'>
//                 Order Note (Optional)
//               </h2>
//               <textarea
//                 value={orderNote}
//                 onChange={(e) => setOrderNote(e.target.value)}
//                 placeholder='Any special instructions for your order...'
//                 className='w-full p-3 border rounded focus:ring-1 focus:ring-primary'
//                 rows='3'
//               />
//             </div>
//           </div>

//           <div className='space-y-6'>
//             <div className='bg-white p-6 rounded-lg shadow'>
//               <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

//               <div className='space-y-4'>
//                 {cartItems.map((item) => (
//                   <div key={item._id} className='flex gap-4 border-b pb-4'>
//                     <img
//                       src={item.images[0]}
//                       alt={item.name}
//                       className='w-16 h-16 object-cover rounded'
//                     />
//                     <div className='flex-1'>
//                       <p className='font-medium'>{item.name}</p>
//                       <p className='text-sm'>Qty: {item.quantity}</p>
//                       <p className='font-medium'>
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className='mt-6'>
//                 <div className='flex items-center gap-2 mb-2'>
//                   <FaTag className='text-gray-500' />
//                   <h3 className='text-sm font-medium'>Apply Coupon Code</h3>
//                 </div>
//                 <div className='flex gap-2'>
//                   <input
//                     type='text'
//                     placeholder='Enter coupon code'
//                     value={coupon}
//                     onChange={(e) => setCoupon(e.target.value)}
//                     className='flex-1 p-2 border rounded focus:ring-1 focus:ring-primary'
//                   />
//                   <button
//                     onClick={handleApplyCoupon}
//                     className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
//                   >
//                     Apply
//                   </button>
//                 </div>
//                 {couponApplied && (
//                   <p className='text-sm text-green-600 mt-1'>
//                     Coupon applied successfully!
//                   </p>
//                 )}
//               </div>

//               <div className='mt-6 border-t pt-4'>
//                 <h3 className='text-lg font-semibold mb-3'>Price Details</h3>
//                 <div className='space-y-2'>
//                   <div className='flex justify-between'>
//                     <p>Subtotal:</p>
//                     <p>₹{subtotal.toFixed(2)}</p>
//                   </div>
//                   {couponApplied && (
//                     <div className='flex justify-between'>
//                       <p>Coupon Discount:</p>
//                       <p className='text-green-600'>
//                         -₹{couponDiscount.toFixed(2)}
//                       </p>
//                     </div>
//                   )}
//                   <div className='flex justify-between font-medium text-lg pt-2 border-t'>
//                     <p>Total Amount:</p>
//                     <p>₹{total.toFixed(2)}</p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={!selectedAddress}
//                 className={`w-full mt-6 py-3 rounded-lg text-lg font-medium transition ${
//                   selectedAddress
//                     ? "bg-primary text-white hover:bg-secondary"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Pay & Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// !---------------------------------------------------------------

// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter, useSearchParams } from "next/navigation";
// import { fetchAddresses } from "@/redux/slices/addressSlice";
// import { FaTag } from "react-icons/fa";
// import AddressSection from "@/components/AddressSection";
// import axios from "@/lib/api";

// const CheckoutPage = () => {
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [coupon, setCoupon] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [orderNote, setOrderNote] = useState("");

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const cartItems = useSelector((state) => state.cart.items || []);
//   const user = useSelector((state) => state.auth.user);

//   // 👉 Read query params
//   const searchParams = useSearchParams();
//   const checkoutType = searchParams.get("type"); // e.g. viewPlan
//   const planTitle = searchParams.get("title");
//   const planPrice = Number(searchParams.get("price"));
//   const quantity = Number(searchParams.get("quantity"));

//   const planAmountParam = searchParams.get("amount") || "0";

//   const PlanAmount = Number(planAmountParam.replace(/[^0-9.]/g, ""));

//   const isViewPlan = checkoutType === "viewPlan";

//   // 👉 Dynamic items
//   const itemsToShow = isViewPlan
//     ? [
//         {
//           title: planTitle,
//           price: PlanAmount,
//           quantity: quantity,
//         },
//       ]
//     : cartItems;

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isViewPlan && cartItems.length === 0) {
//       router.push("/cart");
//     }
//   }, [cartItems, router, isViewPlan]);

//   // Totals
//   const subtotal = itemsToShow.reduce(
//     (acc, item) => acc + item.price * (item.quantity || 1),
//     0
//   );
//   const total = subtotal - couponDiscount;

//   const handleApplyCoupon = () => {
//     if (coupon === "SAVE10") {
//       setCouponDiscount(subtotal * 0.1);
//       setCouponApplied(true);
//     } else {
//       setCouponDiscount(0);
//       setCouponApplied(false);
//     }
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async ({ amount, user, onSuccess }) => {
//     const isSDKLoaded = await loadRazorpayScript();
//     if (!isSDKLoaded) {
//       alert("Failed to load Razorpay SDK");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/payment/order", {
//         amount,
//         items: itemsToShow,
//         addressId: selectedAddress._id,
//         note: orderNote,
//         type: isViewPlan ? "viewPlan" : "cart",
//       });

//       const createdOrderId = data.order.id;
//       const mongoOrderId = data.order.mongoOrderId;

//       const options = {
//         key: "rzp_test_ZckjTyZsXhMpzT", // ✅ Replace with live key in prod
//         amount: data.order.amount,
//         order_id: createdOrderId,
//         handler: async function (response) {
//           try {
//             const verifyRes = await axios.post("/payment/verify", {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             if (verifyRes.data.success) {
//               onSuccess(mongoOrderId);
//             } else {
//               alert("Payment verification failed");
//             }
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             alert("Payment verification error");
//           }
//         },
//         prefill: {
//           name: user?.name,
//           email: user?.email,
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert("Something went wrong while placing the order.");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select a shipping address");
//       return;
//     }

//     await handlePayment({
//       amount: total,
//       user,
//       onSuccess: (orderId) => {
//         router.push(`/orderConfirmation/${orderId}`);
//       },
//     });
//   };

//   return (
//     <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-6xl mx-auto'>
//         <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
//           Checkout
//         </h1>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
//           <div className='lg:col-span-2 space-y-8'>
//             <AddressSection
//               selectedAddress={selectedAddress}
//               setSelectedAddress={setSelectedAddress}
//             />

//             <div className='bg-white p-6 rounded-lg shadow'>
//               <h2 className='text-lg font-semibold mb-4'>
//                 Order Note (Optional)
//               </h2>
//               <textarea
//                 value={orderNote}
//                 onChange={(e) => setOrderNote(e.target.value)}
//                 placeholder='Any special instructions for your order...'
//                 className='w-full p-3 border rounded focus:ring-1 focus:ring-primary'
//                 rows='3'
//               />
//             </div>
//           </div>

//           <div className='space-y-6'>
//             <div className='bg-white p-6 rounded-lg shadow'>
//               <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

//               <div className='space-y-4'>
//                 {itemsToShow.map((item, idx) => (
//                   <div key={idx} className='flex gap-4 border-b pb-4'>
//                     {!isViewPlan && (
//                       <img
//                         src={item.images?.[0]}
//                         alt={item.name}
//                         className='w-16 h-16 object-cover rounded'
//                       />
//                     )}
//                     <div className='flex-1'>
//                       <p className='font-medium'>
//                         {isViewPlan ? item.title : item.name}
//                       </p>
//                       <p className='text-sm'>Qty: {item.quantity}</p>
//                       <p className='font-medium'>
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {!isViewPlan && (
//                 <div className='mt-6'>
//                   <div className='flex items-center gap-2 mb-2'>
//                     <FaTag className='text-gray-500' />
//                     <h3 className='text-sm font-medium'>Apply Coupon Code</h3>
//                   </div>
//                   <div className='flex gap-2'>
//                     <input
//                       type='text'
//                       placeholder='Enter coupon code'
//                       value={coupon}
//                       onChange={(e) => setCoupon(e.target.value)}
//                       className='flex-1 p-2 border rounded focus:ring-1 focus:ring-primary'
//                     />
//                     <button
//                       onClick={handleApplyCoupon}
//                       className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
//                     >
//                       Apply
//                     </button>
//                   </div>
//                   {couponApplied && (
//                     <p className='text-sm text-green-600 mt-1'>
//                       Coupon applied successfully!
//                     </p>
//                   )}
//                 </div>
//               )}

//               <div className='mt-6 border-t pt-4'>
//                 <h3 className='text-lg font-semibold mb-3'>Price Details</h3>
//                 <div className='space-y-2'>
//                   <div className='flex justify-between'>
//                     <p>Subtotal:</p>
//                     <p>₹{subtotal.toFixed(2)}</p>
//                   </div>
//                   {couponApplied && (
//                     <div className='flex justify-between'>
//                       <p>Coupon Discount:</p>
//                       <p className='text-green-600'>
//                         -₹{couponDiscount.toFixed(2)}
//                       </p>
//                     </div>
//                   )}
//                   <div className='flex justify-between font-medium text-lg pt-2 border-t'>
//                     <p>Total Amount:</p>
//                     <p>₹{total.toFixed(2)}</p>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={!selectedAddress}
//                 className={`w-full mt-6 py-3 rounded-lg text-lg font-medium transition ${
//                   selectedAddress
//                     ? "bg-primary text-white hover:bg-secondary"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Pay & Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
// !---------------------------------------------------------------

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAddresses } from "@/redux/slices/addressSlice";
import { FaTag } from "react-icons/fa";
import AddressSection from "@/components/AddressSection";
import axios from "@/lib/api";

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  // console.log(selectedAddress, "address");

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orderNote, setOrderNote] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user);

  const { addresses, loading, error } = useSelector(
    (state) => state.address || []
  );

  // Auto-select first address if not already selected
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  // 👉 Read query params
  const searchParams = useSearchParams();
  const checkoutType = searchParams.get("type");
  const planTitle = searchParams.get("title");
  const quantity = Number(searchParams.get("quantity"));
  const planAmountParam = searchParams.get("amount") || "0";

  // 👉 Rs. 4599/- → 4599
  const PlanAmount = Number(planAmountParam.replace(/[^0-9]/g, ""));
  // console.log(PlanAmount, "HEllo");
  const isViewPlan = checkoutType === "viewPlan";

  const itemsToShow = isViewPlan
    ? [
        {
          title: planTitle,
          price: PlanAmount,
          quantity: quantity,
        },
      ]
    : cartItems;

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (!isViewPlan && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router, isViewPlan]);

  // ✅ Subtotal / total for ViewPlan: same amount, no discount
  const subtotal = isViewPlan
    ? PlanAmount
    : cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      );

  const total = isViewPlan ? PlanAmount : subtotal - couponDiscount;

  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") {
      setCouponDiscount(subtotal * 0.1);
      setCouponApplied(true);
    } else {
      setCouponDiscount(0);
      setCouponApplied(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async ({ amount, user, onSuccess }) => {
    const isSDKLoaded = await loadRazorpayScript();
    if (!isSDKLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const { data } = await axios.post("/payment/order", {
        amount, // paisa mein bhejenge niche se
        items: itemsToShow,
        addressId: selectedAddress._id,
        note: orderNote,
        type: isViewPlan ? "viewPlan" : "cart",
      });

      const createdOrderId = data.order.id;
      const mongoOrderId = data.order.mongoOrderId;

      const options = {
        key: "rzp_test_ZckjTyZsXhMpzT",
        amount: data.order.amount,
        order_id: createdOrderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              onSuccess(mongoOrderId);
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Payment verification error");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Something went wrong while placing the order.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address");
      return;
    }

    await handlePayment({
      amount: total * 100, // paisa mein bhejo
      user,
      onSuccess: (orderId) => {
        router.push(`/orderConfirmation/${orderId}`);
      },
    });
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-8'>
          Checkout
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            <AddressSection
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />

            <div className='bg-white p-6 rounded-lg shadow'>
              <h2 className='text-lg font-semibold mb-4'>
                Order Note (Optional)
              </h2>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder='Any special instructions for your order...'
                className='w-full p-3 border rounded focus:ring-1 focus:ring-primary'
                rows='3'
              />
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

              <div className='space-y-4'>
                {itemsToShow.map((item, idx) => (
                  <div key={idx} className='flex gap-4 border-b pb-4'>
                    {!isViewPlan && (
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className='w-16 h-16 object-cover rounded'
                      />
                    )}
                    <div className='flex-1'>
                      <p className='font-medium'>
                        {isViewPlan ? item.title : item.name}
                      </p>
                      <p className='text-sm'>Qty: {item.quantity}</p>
                      <p className='font-medium'>
                        ₹
                        {isViewPlan
                          ? PlanAmount.toFixed(2)
                          : (item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {!isViewPlan && (
                <div className='mt-6'>
                  <div className='flex items-center gap-2 mb-2'>
                    <FaTag className='text-gray-500' />
                    <h3 className='text-sm font-medium'>Apply Coupon Code</h3>
                  </div>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Enter coupon code'
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className='flex-1 p-2 border rounded focus:ring-1 focus:ring-primary'
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className='text-sm text-green-600 mt-1'>
                      Coupon applied successfully!
                    </p>
                  )}
                </div>
              )}

              <div className='mt-6 border-t pt-4'>
                <h3 className='text-lg font-semibold mb-3'>Price Details</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <p>Subtotal:</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>
                  {!isViewPlan && couponApplied && (
                    <div className='flex justify-between'>
                      <p>Coupon Discount:</p>
                      <p className='text-green-600'>
                        -₹{couponDiscount.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div className='flex justify-between font-medium text-lg pt-2 border-t'>
                    <p>Total Amount:</p>
                    <p>₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress}
                className={`w-full mt-6 py-3 rounded-lg text-lg font-medium transition ${
                  selectedAddress
                    ? "bg-primary text-white hover:bg-secondary"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Pay & Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
