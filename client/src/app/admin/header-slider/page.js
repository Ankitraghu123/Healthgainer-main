"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState, useEffect, useCallback } from "react";
>>>>>>> completed
import { useDispatch, useSelector } from "react-redux";
import {
  createImage,
  updateImage,
  clearImageState,
} from "@/redux/slices/header-slice/imageSlice";
<<<<<<< HEAD

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

=======
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
>>>>>>> completed
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const HeaderImageSlider = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.headerSlider
  );
<<<<<<< HEAD

=======
>>>>>>> completed
  const [images, setImages] = useState([]);
  const [sourceUrl, setSourceUrl] = useState("");
  const [viewType, setViewType] = useState("desktop");

  useEffect(() => {
    if (initialData) {
      setSourceUrl(initialData.sourceUrl || initialData.url || "");
      setViewType(initialData.viewType || "desktop");
    }
  }, [initialData]);

<<<<<<< HEAD
  const handleImageUpload = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the fields?"
    );
    if (!confirmSubmit) return;
    try {
      if (initialData) {
        await dispatch(
          updateImage({ id: initialData._id, sourceUrl, viewType })
        ).unwrap();
        toast.success("Image updated successfully");
      } else {
        const formData = new FormData();
        if (images && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }
          formData.append("viewType", viewType);
          await dispatch(createImage(formData)).unwrap();
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Please select image(s).");
          return;
        }
      }

      if (onSubmit) onSubmit();
    } catch (err) {
      toast.error("Operation failed");
    }
  };
=======
  const handleImageUpload = useCallback((e) => {
    setImages(e.target.files);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to submit the fields?"))
        return;

      try {
        if (initialData) {
          await dispatch(
            updateImage({ id: initialData._id, sourceUrl, viewType })
          ).unwrap();
          toast.success("Image updated successfully");
        } else {
          if (!images || images.length === 0) {
            toast.error("Please select image(s).");
            return;
          }

          const formData = new FormData();
          Array.from(images).forEach((file) => formData.append("images", file));
          formData.append("viewType", viewType);

          await dispatch(createImage(formData)).unwrap();
          toast.success("Image uploaded successfully");
        }

        onSubmit?.();
      } catch {
        toast.error("Operation failed");
      }
    },
    [dispatch, images, initialData, sourceUrl, viewType, onSubmit]
  );
>>>>>>> completed

  useEffect(() => {
    if (success || error) {
      setImages([]);
      setSourceUrl("");
      dispatch(clearImageState());
    }
  }, [success, error, dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit Header Image" : "Upload Header Slider Images"}
      </h2>

      <div className="space-y-2">
        <Label>View Type</Label>
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select view type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>

<<<<<<< HEAD
      {/* {initialData && (
        <div className="space-y-2">
          <Label htmlFor="source-url">Image URL (optional)</Label>
          <Input
            id="source-url"
            type="text"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      )} */}

=======
>>>>>>> completed
      <div className="space-y-2">
        <Label htmlFor="image-upload">
          {initialData ? "Upload new image (optional)" : "Choose Image(s)"}
        </Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple={!initialData}
          onChange={handleImageUpload}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? initialData
            ? "Updating..."
            : "Uploading..."
          : initialData
          ? "Update Image"
          : "Upload Images"}
      </Button>
    </form>
  );
};

export default HeaderImageSlider;
