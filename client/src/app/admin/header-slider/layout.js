"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Loader2 } from "lucide-react";
import YourForm from "./page"; // 👈 tumhara form
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllImages,
  deleteImage,
  updateImage,
  createImage,
} from "@/redux/slices/header-slice/imageSlice";

export default function ImageTable() {
  const dispatch = useDispatch();
  const { images, loading } = useSelector((state) => state?.headerSlider);

  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState(null); // 🖊️ edit image state

  useEffect(() => {
    const handleFetch = async () => {
      try {
        await dispatch(fetchAllImages()).unwrap();
      } catch (error) {
        console.log(error.message);
      }
    };

    handleFetch();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteImage(id)).unwrap();
      await dispatch(fetchAllImages()).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (image) => {
    setEditImage(image);
    setOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editImage) {
        await dispatch(
          updateImage({
            id: editImage._id,
            sourceUrl: formData.sourceUrl,
          })
        ).unwrap();
      } else {
        const newFormData = new FormData();
        newFormData.append("images", formData.images[0]); // assuming single image
        await dispatch(createImage(newFormData)).unwrap();
      }

      await dispatch(fetchAllImages()).unwrap();
      setOpen(false);
      setEditImage(null);
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center p-6'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Image Gallery</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditImage(null); // 🆕 reset edit mode when adding new
              }}
            >
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editImage ? "Edit Image" : "Add Image"}</DialogTitle>
            <YourForm initialData={editImage} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='border rounded-md overflow-hidden'>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='p-2 text-left'>Image</th>
              <th className='p-2 text-left'>View Type</th>
              <th className='p-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images?.map((img) => (
              <tr key={img._id} className='border-t'>
                <td className='p-2'>
                  <Image
                    src={img.url}
                    alt={img._id}
                    width={60}
                    height={60}
                    className='rounded-md object-cover'
                  />
                </td>
                <td className='p-2'>{img.type || "Untitled"}</td>
                <td className='p-2 space-x-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleEdit(img)}
                  >
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='destructive'
                    size='icon'
                    onClick={() => handleDelete(img._id)}
                  >
                    <Trash className='h-4 w-4' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
