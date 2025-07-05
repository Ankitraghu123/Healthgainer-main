"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  deleteNews,
  updateNews,
  createNews,
} from "@/redux/slices/news-slice";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Loader2 } from "lucide-react";
import NewsForm from "./page";

export default function NewsSection() {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state) => state.news);

  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteNews(id)).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await dispatch(updateNews({ id: editData._id, formData })).unwrap();
      } else {
        await dispatch(createNews(formData)).unwrap();
      }

      setOpen(false);
      setEditData(null);
    } catch (err) {
      console.error("Form submit failed", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">News Section</h2>

        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) setEditData(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditData(null)}>Add News</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? "Edit News" : "Add News"}</DialogTitle>
            <NewsForm initialData={editData} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-lg p-4 flex flex-col items-center shadow-md text-center"
          >
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={100}
              height={100}
              className="object-contain rounded"
            />
            <p className="mt-2 font-medium">{item.label}</p>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(item)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(item._id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
