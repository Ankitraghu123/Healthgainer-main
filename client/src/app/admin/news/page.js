"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect, useCallback, useMemo } from "react";
>>>>>>> completed
import { useDispatch } from "react-redux";
import { createNews, updateNews } from "@/redux/slices/news-slice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const NewsForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();

<<<<<<< HEAD
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
=======
  const [formState, setFormState] = useState({
    label: "",
    link: "",
    image: null
  });
>>>>>>> completed
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
<<<<<<< HEAD
      setLabel(initialData.label || "");
      setLink(initialData.link || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
=======
      setFormState({
        label: initialData.label || "",
        link: initialData.link || "",
        image: null
      });
    }
  }, [initialData]);

  const handleInputChange = useCallback((field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    handleInputChange('image', e.target.files[0]);
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
    setSubmitting(true);

    const formData = new FormData();
    formData.append("label", label);
    formData.append("link", link);
    if (image) formData.append("image", image);
=======
    
    setSubmitting(true);

    const formData = new FormData();
    formData.append("label", formState.label);
    formData.append("link", formState.link);
    if (formState.image) formData.append("image", formState.image);
>>>>>>> completed

    try {
      if (initialData) {
        await dispatch(updateNews({ id: initialData._id, formData })).unwrap();
        toast.success("News updated");
      } else {
        await dispatch(createNews(formData)).unwrap();
        toast.success("News created");
      }
<<<<<<< HEAD

      if (onSubmit) onSubmit();

      setLabel("");
      setLink("");
      setImage(null);
    } catch (err) {
      toast.error("Failed to save news");
      console.error("News form submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };
=======
      onSubmit?.();

      setFormState({
        label: "",
        link: "",
        image: null
      });
    } catch (err) {
      toast.error("Failed to save news");
    } finally {
      setSubmitting(false);
    }
  }, [formState, initialData, dispatch, onSubmit]);

  const formTitle = useMemo(() => 
    initialData ? "Edit News" : "Add News",
    [initialData]
  );

  const buttonText = useMemo(() => {
    if (submitting) return "Saving...";
    return initialData ? "Update" : "Create";
  }, [submitting, initialData]);
>>>>>>> completed

  return (
    <form
      onSubmit={handleSubmit}
<<<<<<< HEAD
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

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : initialData ? "Update" : "Create"}
=======
      className="max-w-md mx-auto p-4 border rounded shadow-sm space-y-3"
    >
      <h2 className="text-md font-semibold">{formTitle}</h2>

      <div className="space-y-1">
        <Label htmlFor="label" className="text-sm">Label</Label>
        <Input
          id="label"
          value={formState.label}
          onChange={(e) => handleInputChange('label', e.target.value)}
          placeholder="e.g. NDTV, India Today"
          className="text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="link" className="text-sm">Redirect Link</Label>
        <Input
          id="link"
          value={formState.link}
          onChange={(e) => handleInputChange('link', e.target.value)}
          placeholder="https://example.com"
          className="text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="image" className="text-sm">Upload Channel Logo</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      <Button 
        type="submit" 
        disabled={submitting} 
        className="w-full text-sm py-2"
      >
        {buttonText}
>>>>>>> completed
      </Button>
    </form>
  );
};

<<<<<<< HEAD
export default NewsForm;
=======
export default NewsForm;
>>>>>>> completed
