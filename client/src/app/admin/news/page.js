"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNews, updateNews } from "@/redux/slices/news-slice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NewsForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const { loading } = useSelector((state) => state.news);

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setLink(initialData.link);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("label", label);
    formData.append("link", link);
    if (image) formData.append("image", image);

    if (initialData) {
      await dispatch(updateNews({ id: initialData._id, formData })).unwrap();
    } else {
      await dispatch(createNews(formData)).unwrap();
    }

    if (onSubmit) onSubmit();

    setLabel("");
    setLink("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit News" : "Add News"}
      </h2>

      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. NDTV, India Today"
        />
      </div>

      <div className="space-y-2">
        <Label>Redirect Link</Label>
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Channel Logo</Label>
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

export default NewsForm;
