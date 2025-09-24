"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect, useCallback, useMemo } from "react";
>>>>>>> completed
import { useDispatch, useSelector } from "react-redux";
import {
  createMediaReport,
  updateMediaReport,
} from "@/redux/slices/mediaReport-slice";
<<<<<<< HEAD

=======
>>>>>>> completed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MediaReportForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.mediaReports);
<<<<<<< HEAD

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
=======
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    icon: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        title: initialData.title || "",
        description: initialData.description || "",
        url: initialData.url || ""
      }));
    }
  }, [initialData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    handleInputChange('icon', e.target.files[0]);
  }, [handleInputChange]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
>>>>>>> completed
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the fields?"
    );
    if (!confirmSubmit) return;
<<<<<<< HEAD
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
=======

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("url", formData.url);
    if (formData.icon) submitData.append("icon", formData.icon);

    try {
      if (initialData) {
        await dispatch(updateMediaReport({ 
          id: initialData._id, 
          formData: submitData 
        })).unwrap();
      } else {
        await dispatch(createMediaReport(submitData)).unwrap();
      }

      setFormData({
        title: "",
        description: "",
        url: "",
        icon: null
      });

      onSubmit?.(true);
    } catch (err) {
      onSubmit?.(false);
    }
  }, [formData, initialData, dispatch, onSubmit]);

  const buttonText = useMemo(() => {
    if (loading) {
      return initialData ? "Updating..." : "Creating...";
    }
    return initialData ? "Update" : "Create";
  }, [loading, initialData]);

  const formTitle = useMemo(() => 
    initialData ? "Edit Media Report" : "Add New Media Report",
    [initialData]
  );
>>>>>>> completed

  return (
    <form
      onSubmit={handleSubmit}
<<<<<<< HEAD
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
=======
      className="max-w-xl mx-auto p-4 border rounded shadow-sm space-y-3"
    >
      <h2 className="text-md font-semibold">{formTitle}</h2>

      <div className="space-y-1">
        <Label htmlFor="title" className="text-sm">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter title"
          className="text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description" className="text-sm">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter description"
          className="text-sm min-h-[80px]"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="url" className="text-sm">Report URL</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          placeholder="https://example.com/article"
          className="text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="icon" className="text-sm">Upload Icon</Label>
        <Input
          id="icon"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full text-sm py-2"
      >
        {buttonText}
>>>>>>> completed
      </Button>
    </form>
  );
};

<<<<<<< HEAD
export default MediaReportForm;
=======
export default MediaReportForm;
>>>>>>> completed
