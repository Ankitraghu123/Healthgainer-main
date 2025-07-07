"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeals,
  deleteDeal,
} from "@/redux/slices/deal-slice";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Loader2 } from "lucide-react";
import Image from "next/image";
import DealForm from "./page";
import { toast } from "react-toastify";

export default function DealsLayout() {
  const dispatch = useDispatch();
  const { deals, loading } = useSelector((state) => state.deals);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const handleEdit = (deal) => {
    setEditData(deal);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteDeal(id)).unwrap();
      toast.success("Deal deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete deal");
    } finally {
      setDeleteDialog({ open: false, id: null });
    }
  };

  const handleSubmit = () => {
    setOpen(false);
    setEditData(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Deal of the Day</h2>

        <Dialog open={open} onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditData(null);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditData(null)}>Add Deal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? "Edit Deal" : "Add Deal"}</DialogTitle>
            <DealForm initialData={editData} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal._id}
            className="border rounded-lg p-4 shadow bg-white space-y-3"
          >
            <Image
              src={deal.image}
              alt={deal.title}
              width={200}
              height={200}
              className="w-full h-48 object-contain mx-auto"
            />
            <h3 className="text-xl font-semibold">{deal.title}</h3>
            <p className="text-gray-500">{deal.subtitle}</p>
            <p className="text-lg font-bold text-lime-600">{deal.price}</p>
            {deal.tag && <span className="text-sm text-orange-600">{deal.tag}</span>}
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEdit(deal)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setDeleteDialog({ open: true, id: deal._id })}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(val) => setDeleteDialog({ ...deleteDialog, open: val })}>
        <DialogContent>
          <DialogTitle>Are you sure you want to delete this deal?</DialogTitle>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, id: null })}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteDialog.id)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
