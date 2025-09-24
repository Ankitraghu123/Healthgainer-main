"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect, useCallback } from "react";
>>>>>>> completed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

<<<<<<< HEAD
const BenefitForm = ({ initialData = null, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
=======
const FORM_LABELS = {
  EDIT: "Edit Benefit",
  ADD: "Add New Benefit",
  TITLE: "Title",
  DESCRIPTION: "Description",
  UPLOAD_ICON: "Upload Icon"
};

const PLACEHOLDERS = {
  TITLE: "Enter title",
  DESCRIPTION: "Enter description"
};

const CONFIRM_MESSAGE = "Are you sure you want to submit the fields?";

const BenefitForm = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: null
  });
>>>>>>> completed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
<<<<<<< HEAD
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the fields?"
    );
    if (!confirmSubmit) return;
    e.preventDefault();
=======
      setFormData(prev => ({
        ...prev,
        title: initialData.title || "",
        description: initialData.description || ""
      }));
    }
  }, [initialData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTitleChange = useCallback((e) => {
    handleInputChange('title', e.target.value);
  }, [handleInputChange]);

  const handleDescriptionChange = useCallback((e) => {
    handleInputChange('description', e.target.value);
  }, [handleInputChange]);

  const handleIconChange = useCallback((e) => {
    handleInputChange('icon', e.target.files[0] || null);
  }, [handleInputChange]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!window.confirm(CONFIRM_MESSAGE)) return;
    
>>>>>>> completed
    setLoading(true);

    try {
      if (onSubmit) {
<<<<<<< HEAD
        await onSubmit({ title, description, icon });
        setTitle("");
        setDescription("");
        setIcon(null);
=======
        await onSubmit(formData);
        setFormData({ title: "", description: "", icon: null });
>>>>>>> completed
      }
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  };
=======
  }, [formData, onSubmit]);

  const isEditMode = Boolean(initialData);
  const buttonText = loading ? "Saving..." : (isEditMode ? "Update" : "Create");
>>>>>>> completed

  return (
    <form
      onSubmit={handleSubmit}
<<<<<<< HEAD
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit Benefit" : "Add New Benefit"}
      </h2>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
=======
      className="max-w-xl mx-auto p-6 border rounded-md space-y-4"
    >
      <h2 className="text-lg font-bold">
        {isEditMode ? FORM_LABELS.EDIT : FORM_LABELS.ADD}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="title">{FORM_LABELS.TITLE}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder={PLACEHOLDERS.TITLE}
          required
          disabled={loading}
>>>>>>> completed
        />
      </div>

      <div className="space-y-2">
<<<<<<< HEAD
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
=======
        <Label htmlFor="description">{FORM_LABELS.DESCRIPTION}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={handleDescriptionChange}
          placeholder={PLACEHOLDERS.DESCRIPTION}
          required
          disabled={loading}
          rows={4}
>>>>>>> completed
        />
      </div>

      <div className="space-y-2">
<<<<<<< HEAD
        <Label>Upload Icon</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setIcon(e.target.files[0])}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : initialData ? "Update" : "Create"}
=======
        <Label htmlFor="icon">{FORM_LABELS.UPLOAD_ICON}</Label>
        <Input
          id="icon"
          type="file"
          accept="image/*"
          onChange={handleIconChange}
          disabled={loading}
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full"
        aria-label={buttonText}
      >
        {buttonText}
>>>>>>> completed
      </Button>
    </form>
  );
};

<<<<<<< HEAD
export default BenefitForm;
=======
export default BenefitForm;
>>>>>>> completed
