'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import API from '@/lib/api';
import { CheckCircle, Download, ArrowLeft, Loader2, Home, Phone, Mail, Clock } from 'lucide-react';

export default function OrderConfirmationPage({ params }) {
    const orderId = params?.orderId;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/orders/${orderId}`);
                const data = response.data;
                
                if (!data.success) throw new Error("Order not found");
                setOrder(data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const handleDownloadInvoice = async () => {
        try {
            setDownloading(true);
            const invoiceElement = document.getElementById('invoice');
            const canvas = await html2canvas(invoiceElement, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`Invoice_${order._id}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setDownloading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-primary hover:text-secondary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Back to Orders</span>
                </button>

                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                    {/* Invoice Header */}
                    <div id="invoice" className="p-0">
                        {/* Company Header */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        {/* Replace with your actual logo */}
                                        <div className="bg-white p-2 rounded-md">
                                            <div className="text-blue-700 font-bold text-xl">
                                                <img className='w-20' src="/logo.png" alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold">Health Gainer</h1>
                                            <p className="text-white">Quality Healthcare Products</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-start gap-2">
                                            <Home className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <span>123 Health Street, Bhopal, MP 462001</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            <span>+91 98765 43210</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            <span>support@pharmascience.com</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>Mon-Sat: 9AM - 7PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-md backdrop-blur-sm">
                                    <h2 className="text-xl font-bold mb-2">INVOICE</h2>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="font-medium">Invoice #</span>
                                        <span>{order._id}</span>
                                        <span className="font-medium">Date</span>
                                        <span>{formatDate(order.createdAt)}</span>
                                        <span className="font-medium">Status</span>
                                        <span className="capitalize">{order.status.toLowerCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer and Payment Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="font-medium text-gray-900">{order.address.fullName}</p>
                                    <p className="text-gray-700">{order.address.street}</p>
                                    <p className="text-gray-700">{order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                                    <p className="text-gray-700">{order.address.country}</p>
                                    <p className="mt-2 text-gray-700">
                                        <span className="font-medium">Phone:</span> {order.address.phone}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Information</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="grid grid-cols-2 gap-2">
                                        <span className="font-medium text-gray-700">Method:</span>
                                        <span className="text-gray-700 capitalize">{order.paymentMethod.toLowerCase()}</span>
                                        <span className="font-medium text-gray-700">Status:</span>
                                        <span className="capitalize">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                                                order.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {order.paymentStatus.toLowerCase()}
                                            </span>
                                        </span>
                                        <span className="font-medium text-gray-700">Amount:</span>
                                        <span className="font-bold text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        {item.productId.images && item.productId.images.length > 0 && (
                                                            <div className="flex-shrink-0 h-12 w-12">
                                                                <img 
                                                                    className="h-12 w-12 rounded-md object-cover border border-gray-200" 
                                                                    src={item.productId.images[0]} 
                                                                    alt={item.productId.name} 
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{item.productId.name}</div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {item.productId.description.substring(0, 60)}...
                                                            </div>
                                                            {item.variantId && (
                                                                <div className="mt-1">
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                                                                        {item.productId.variants.find(v => v._id === item.variantId)?.weight || 'Standard'}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    ₹{item.price.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 p-6 border-t">
                            <div className="max-w-md ml-auto">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (GST 12%)</span>
                                        <span className="font-medium">₹{(order.totalAmount * 0.12).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                        <span className="text-lg font-semibold">Total Amount</span>
                                        <span className="text-lg font-bold">
                                            ₹{(order.totalAmount * 1.12).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Notes */}
                        {order.note && (
                            <div className="p-6 border-t">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Notes</h3>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                                    <p className="text-sm text-yellow-700">
                                        {order.note}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Thank You & Footer */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-blue-100">We appreciate your business. Please contact us if you have any questions.</p>
                                </div>
                                <button
                                    onClick={handleDownloadInvoice}
                                    disabled={downloading}
                                    className="flex items-center gap-2 bg-white text-primary hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-70 shadow-md"
                                >
                                    {downloading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="h-5 w-5" />
                                    )}
                                    Download Invoice
                                </button>
                            </div>
                        </div>

                        {/* Company Footer */}
                        <div className="bg-gray-800 text-gray-300 p-4 text-center text-sm">
                            <p>© {new Date().getFullYear()} Health Gainer. All rights reserved.</p>
                            <p className="mt-1">GSTIN: 22AAAAA0000A1Z5 | CIN: U24246MH2023PTC403456</p>
                        </div>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <Home className="h-5 w-5" />
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => router.push('/contact')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                    >
                        <Phone className="h-5 w-5" />
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}