"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BenefitForm = ({ initialData = null, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
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
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ title, description, icon });
        setTitle("");
        setDescription("");
        setIcon(null);
      }
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        <Label>Upload Icon</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setIcon(e.target.files[0])}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : initialData ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default BenefitForm;
