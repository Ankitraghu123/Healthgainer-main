// app/(admin)/deals/layout.js
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

export default function DealsLayout() {
  const dispatch = useDispatch();
  const { deals, loading } = useSelector((state) => state.deals);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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
    } catch (err) {
      console.error("Delete failed", err);
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
              <Button variant="destructive" size="icon" onClick={() => handleDelete(deal._id)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
