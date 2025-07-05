// app/(admin)/deals/page.js
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeal,
  updateDeal,
} from "@/redux/slices/deal-slice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const DealForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(null);
  const { loading } = useSelector((state) => state.deals);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubtitle(initialData.subtitle);
      setPrice(initialData.price);
      setQuantity(initialData.quantity);
      setTag(initialData.tag || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("tag", tag);
    if (image) formData.append("image", image);

    if (initialData) {
      await dispatch(updateDeal({ id: initialData._id, formData })).unwrap();
    } else {
      await dispatch(createDeal(formData)).unwrap();
    }

    if (onSubmit) onSubmit();

    setTitle("");
    setSubtitle("");
    setPrice("");
    setQuantity("");
    setTag("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit Deal" : "Add New Deal"}
      </h2>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Subtitle</Label>
        <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </div>

      <div className="flex gap-4">
      <div className="space-y-2">
        <Label>Price</Label>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      </div>

      <div className="space-y-2">
        <Label>Tag (optional)</Label>
        <Input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="e.g. HOT DEAL"
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : initialData ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default DealForm;
