"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMediaReport,
  updateMediaReport,
} from "@/redux/slices/mediaReport-slice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MediaReportForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.mediaReports);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setUrl(initialData.url || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the fields?"
    );
    if (!confirmSubmit) return;
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("url", url);
    if (icon) formData.append("icon", icon);

    try {
      if (initialData) {
        await dispatch(updateMediaReport({ id: initialData._id, formData })).unwrap();
      } else {
        await dispatch(createMediaReport(formData)).unwrap();
      }

      // Clear form only on success
      setTitle("");
      setDescription("");
      setUrl("");
      setIcon(null);

      if (onSubmit) onSubmit(true); // 🔁 pass success = true
    } catch (err) {
      if (onSubmit) onSubmit(false); // ❌ failure
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit Media Report" : "Add New Media Report"}
      </h2>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div className="space-y-2">
        <Label>Report URL</Label>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/article"
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Icon</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setIcon(e.target.files[0])}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
          ? "Update"
          : "Create"}
      </Button>
    </form>
  );
};

export default MediaReportForm;
