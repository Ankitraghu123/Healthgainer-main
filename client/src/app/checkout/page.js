"use client";

import { useState, useEffect } from "react";
import { FaCreditCard, FaMoneyBillAlt, FaTag, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAddresses } from '@/redux/slices/addressSlice';
import { placeOrder } from '@/redux/slices/orderSlice';
import AddressSection from "@/components/AddressSection";

const CheckoutPage = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [orderNote, setOrderNote] = useState("");
    
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading: orderLoading } = useSelector((state) => state.order || {});
    const cartItems = useSelector((state) => state.cart.items || []);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/cart");
        }
    }, [cartItems, router]);

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalMRP = cartItems.reduce((acc, item) => acc + (item.mrp * item.quantity), 0);
    const productDiscount = totalMRP - subtotal;
    const totalDiscount = productDiscount + couponDiscount;
    const total = subtotal - couponDiscount;

    const handleApplyCoupon = () => {
        if (coupon === "SAVE10") {
            setCouponDiscount(subtotal * 0.1);
            setCouponApplied(true);
        } else {
            setCouponDiscount(0);
            setCouponApplied(false);
        }
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            alert("Please select a shipping address");
            return;
        }

        const orderData = {
            // userId: user?._id,
            // items: cartItems,
            addressId: selectedAddress._id,
            paymentMethod,
            // subtotal,
            // discount: totalDiscount,
            // total,
            // couponCode: couponApplied ? coupon : null,
            // couponDiscount,
            note: orderNote
        };

        // dispatch(placeOrder(orderData)).then((action) => {
        //     console.log("Order placed:", action);
            
        //     if (action.payload?._id) {
        //         router.push(`/orderConfirmation/${action.payload._id}`);
        //     }
        // });

        dispatch(placeOrder(orderData)).then((action) => { 
            console.log("Order placed:", action);
            
            if (action.payload?._id) { 
                console.log("Navigating to:", `/orderConfirmation/${action.payload._id}`);
                router.push(`/orderConfirmation/${action.payload._id}`);
            } else {
                console.error("Order ID missing in response:", action.payload);
            }
        });
        
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Shipping and Payment */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Address Section */}
                        <AddressSection 
                            selectedAddress={selectedAddress} 
                            setSelectedAddress={setSelectedAddress} 
                        />

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => setPaymentMethod("COD")}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded border ${paymentMethod === "COD" ? 'border-primary bg-primary/10' : 'hover:border-gray-400'}`}
                                >
                                    <FaMoneyBillAlt /> 
                                    <span>Cash on Delivery</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("Card")}
                                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded border ${paymentMethod === "Card" ? 'border-primary bg-primary/10' : 'hover:border-gray-400'}`}
                                >
                                    <FaCreditCard /> 
                                    <span>Credit/Debit Card</span>
                                </button>
                            </div>
                            {paymentMethod === "Card" && (
                                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                    <p className="text-sm text-gray-600">Card payment integration would go here</p>
                                </div>
                            )}
                        </div>

                        {/* Order Note */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Order Note (Optional)</h2>
                            <textarea
                                value={orderNote}
                                onChange={(e) => setOrderNote(e.target.value)}
                                placeholder="Any special instructions for your order..."
                                className="w-full p-3 border rounded focus:ring-1 focus:ring-primary"
                                rows="3"
                            />
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            
                            <div className="space-y-4">
                                {cartItems.map((item) => {
                                    const itemDiscount = (item.mrp * item.quantity) - (item.price * item.quantity);
                                    return (
                                        <div key={item._id} className="flex gap-4 border-b pb-4">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-600">{item.weight}</p>
                                                <p className="text-sm">Qty: {item.quantity}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                    {item.mrp > item.price && (
                                                        <p className="text-sm text-gray-500 line-through">₹{(item.mrp * item.quantity).toFixed(2)}</p>
                                                    )}
                                                </div>
                                                {itemDiscount > 0 && (
                                                    <p className="text-xs text-green-600">
                                                        You save ₹{itemDiscount.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Coupon Code */}
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaTag className="text-gray-500" />
                                    <h3 className="text-sm font-medium">Apply Coupon Code</h3>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="flex-1 p-2 border rounded focus:ring-1 focus:ring-primary"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponApplied && (
                                    <p className="text-sm text-green-600 mt-1">Coupon applied successfully!</p>
                                )}
                            </div>

                            {/* Price Summary */}
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-lg font-semibold mb-3">Price Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <p>Total MRP:</p>
                                        <p>₹{totalMRP.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Product Discount:</p>
                                        <p className="text-green-600">-₹{productDiscount.toFixed(2)}</p>
                                    </div>
                                    {couponApplied && (
                                        <div className="flex justify-between">
                                            <p>Coupon Discount:</p>
                                            <p className="text-green-600">-₹{couponDiscount.toFixed(2)}</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                        <p>Total Amount:</p>
                                        <p>₹{total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <p>Total Savings:</p>
                                        <p>₹{totalDiscount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!selectedAddress || orderLoading}
                                className={`w-full mt-6 py-3 rounded-lg text-lg font-medium transition ${selectedAddress ? 'bg-primary text-white hover:bg-secondary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                {orderLoading ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;