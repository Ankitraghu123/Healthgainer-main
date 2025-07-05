"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdvantages,
  createAdvantage,
  updateAdvantage,
  deleteAdvantage,
} from "@/redux/slices/why-choose/advantage-slice/index";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Loader2 } from "lucide-react";

const AdvantageForm = ({ initialData = null, onSubmit }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { loading } = useSelector((state) => state.advantages);

  useEffect(() => {
    if (initialData) {
      setText(initialData.text);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);

    if (initialData) {
      await dispatch(updateAdvantage({ id: initialData._id, formData })).unwrap();
    } else {
      await dispatch(createAdvantage(formData)).unwrap();
    }

    onSubmit();
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 border rounded-md shadow space-y-4"
    >
      <h2 className="text-lg font-bold">
        {initialData ? "Edit Advantage" : "Add New Advantage"}
      </h2>

      <div className="space-y-2">
        <Label>Advantage</Label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter advantage"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : initialData ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default function AdvantageManager() {
  const dispatch = useDispatch();
  const { advantages, loading } = useSelector((state) => state.advantages);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchAdvantages());
  }, [dispatch]);

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteAdvantage(id)).unwrap();
  };

  const handleSubmit = () => {
    setOpen(false);
    setEditData(null);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Why Choose Us: Advantages</h2>

        <Dialog open={open} onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditData(null);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditData(null)}>Add Advantage</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? "Edit" : "Add New"} Advantage</DialogTitle>
            <AdvantageForm initialData={editData} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-6">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv) => (
            <div key={adv._id} className="p-4 border rounded shadow-sm bg-white">
              <p className="text-gray-800 font-medium mb-2">{adv.text}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(adv)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(adv._id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
