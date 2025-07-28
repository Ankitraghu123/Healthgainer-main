'use client';

import { useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { fetchCart, removeFromCart, updateCartQuantity } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const updateQuantity = (variantId, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartQuantity({ variantId, quantity }));
        }
    };

    const removeItem = (variantId) => {
        dispatch(removeFromCart({ variantId }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateSavings = () => {
        return cartItems.reduce((total, item) => total + (item.mrp - item.price) * item.quantity, 0);
    };

    const calculateItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <span>{calculateItemCount()} {calculateItemCount() === 1 ? 'item' : 'items'}</span>
                                {calculateSavings() > 0 && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span className="text-green-600 font-medium">You save ₹{calculateSavings().toFixed(2)}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/product')}
                            className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <FaArrowLeft className="mr-2" />
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400">
                            <FaShoppingBag className="w-full h-full" />
                        </div>
                        <h2 className="mt-4 text-2xl font-medium text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500">Start adding some products to your cart</p>
                        <button
                            onClick={() => router.push('/product')}
                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaArrowLeft className="mr-2" />
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-8">
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                    <h2 className="text-lg font-medium">Cart Items</h2>
                                    <button
                                        onClick={() => dispatch(removeFromCart("all"))}
                                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Empty Cart
                                    </button>
                                </div>

                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item._id} className="p-4">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-24 h-24 rounded-md object-cover"
                                                    />
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium">{item.name}</h3>
                                                            <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
                                                        </div>
                                                        <div className="mt-2 sm:mt-0">
                                                            <p className="text-lg font-semibold">₹{item.price}</p>
                                                            {item.mrp > item.price && (
                                                                <p className="text-sm text-gray-500 line-through">₹{item.mrp}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                            >
                                                                <FaMinus className="h-3 w-3 text-gray-600" />
                                                            </button>
                                                            <span className="px-4 py-2 border-t border-b border-gray-300 text-sm font-medium">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                            >
                                                                <FaPlus className="h-3 w-3 text-gray-600" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeItem(item.variantId)}
                                                            className="ml-4 text-red-600 hover:text-red-800 flex items-center"
                                                        >
                                                            <FaTrash className="mr-1" />
                                                            <span className="text-sm font-medium">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-8 lg:mt-0 lg:col-span-4">
                            <div className="bg-white shadow rounded-lg">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-medium">Order Summary</h2>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal ({calculateItemCount()} {calculateItemCount() === 1 ? 'item' : 'items'})</p>
                                        <p>₹{calculateTotal()}</p>
                                    </div>
                                    <div className="flex justify-between text-sm text-green-600 mt-1">
                                        <p>You save</p>
                                        <p>₹{calculateSavings().toFixed(2)}</p>
                                    </div>
                                    <div className="mt-4 border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Total</p>
                                            <p>₹{calculateTotal()}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => router.push('/checkout')}
                                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>

                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <p>
                                            or{' '}
                                            <button
                                                onClick={() => router.push('/product')}
                                                className="text-indigo-600 font-medium hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="mt-4 space-y-4">
                                <div className="bg-white rounded-lg shadow-sm p-5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-green-500">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Free standard shipping on orders over ₹500. Delivery within 3-5 business days.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm p-5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 text-green-500">
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Easy 30-day returns. We offer free returns for all products.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}