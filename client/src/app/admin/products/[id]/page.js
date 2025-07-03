"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/slices/productSlice";
import { deleteVariant } from "@/redux/slices/variantSlice";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for update and delete
import ConfirmationDialog from "@/components/ConfirmationDialog"; // Custom confirmation dialog
import Link from "next/link";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state?.product?.product || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleDeleteVariant = async (variantId) => {
    try {
      await dispatch(deleteVariant({ productId: id, variantId }));
      alert("Variant deleted successfully!");
      setIsDialogOpen(false);
      setVariantToDelete(null);
      dispatch(fetchProductById(id));
    } catch (error) {
      console.error("Error deleting variant:", error);
      alert("Failed to delete variant.");
    }
  };

  const openDeleteDialog = (variantId) => {
    setVariantToDelete(variantId);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
    setVariantToDelete(null);
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-600">Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 py-1 px-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold mb-6">Product Details</h2>
        {product && (
          <div className="space-y-6">
            {/* Product Details */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={product.images[0]}
                alt={product.name}
                width={150}
                height={150}
                className="rounded-md self-start"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Category", value: product.category },
                { label: "MRP", value: `₹ ${product.mrp}` },
                { label: "Price", value: `₹ ${product.price}` },
                { label: "Stock", value: product.stock },
                { label: "Discount", value: `${product.discount}%` },
                {
                  label: "Status",
                  value: (
                    <span
                      className={`font-semibold ${product.status === "Active" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {product.status}
                    </span>
                  ),
                },
                { label: "Created At", value: new Date(product.createdAt).toLocaleDateString() },
              ].map((item, index) => (
                <div key={index}>
                  <p className="text-gray-600">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Variants Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Variants</h3>
              {product.variants.length > 0 ? (
                product.variants.map((variant, index) => (
                  <div
                    key={variant._id}
                    className="border p-4 rounded-lg mb-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                        {[
                          { label: "Weight", value: variant.weight },
                          { label: "MRP", value: `₹ ${variant.mrp}` },
                          { label: "Price", value: `₹ ${variant.price}` },
                          { label: "Discount", value: `${variant.discount}%` },
                          { label: "Stock", value: variant.stock },
                          {
                            label: "Availability",
                            value: (
                              <span
                                className={`font-semibold ${variant.isAvailable ? "text-green-600" : "text-red-600"
                                  }`}
                              >
                                {variant.isAvailable ? "Available" : "Out of Stock"}
                              </span>
                            ),
                          },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <p className="text-gray-600">{item.label}</p>
                            <p className="font-semibold">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/admin/products/${id}/variants/${variant._id}/edit`}>
                          <button
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FaEdit size={20} />
                          </button>
                        </Link>
                        <button
                          onClick={() => openDeleteDialog(variant._id)}
                          className="text-red-600 hover:text-red-800 transition-colors mb-2"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </div>
                    {/* Variant Images */}
                    <div className="mt-4">
                      <p className="text-gray-600">Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {variant.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Variant ${index + 1} Image ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No variants available for this product.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDeleteVariant(variantToDelete)}
        title="Delete Variant"
        message="Are you sure you want to delete this variant?"
      />
    </div>
  );
}