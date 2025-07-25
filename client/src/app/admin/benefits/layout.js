"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBenefits,
  updateBenefit,
  deleteBenefit,
  createBenefit,
} from "@/redux/slices/benefit-slice/index";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { Pencil, Trash, Loader2 } from "lucide-react";
import BenefitForm from "./page";
import { toast } from "react-toastify";

function BenefitRow({ benefit, onEdit, onConfirmDelete }) {
  return (
    <tr className="border-t bg-white">
      <td className="p-2 shadow-2xl bg-black">
        <Image
          src={benefit.iconUrl}
          alt="benefit icon"
          width={40}
          height={40}
          className="rounded"
        />
      </td>

      <td className="p-2 font-medium">{benefit.title}</td>

      <td className="p-2 max-w-60">
        {benefit.description?.length > 400
          ? benefit.description.slice(0, 400) + "..."
          : benefit.description}
      </td>

      <td className="p-2 space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(benefit)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onConfirmDelete(benefit)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}

export default function BenefitTable() {
  const dispatch = useDispatch();
  const { benefits, loading } = useSelector((state) => state.benefits);

  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [benefitToDelete, setBenefitToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchBenefits())
      .unwrap()
      .catch(() => toast.error("Failed to fetch benefits"));
  }, [dispatch]);

  const handleEdit = (benefit) => {
    setEditData(benefit);
    setOpen(true);
  };

  const handleConfirmDelete = (benefit) => {
    setBenefitToDelete(benefit);
    setConfirmDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!benefitToDelete) return;

    try {
      await dispatch(deleteBenefit(benefitToDelete._id)).unwrap();
      toast.success("Benefit deleted successfully");
    } catch (err) {
      toast.error("Failed to delete benefit");
    } finally {
      setConfirmDeleteDialog(false);
      setBenefitToDelete(null);
    }
  };

  const handleSubmit = async ({ title, description, icon }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);

    try {
      if (editData) {
        await dispatch(updateBenefit({ id: editData._id, formData })).unwrap();
        toast.success("Benefit updated successfully");
      } else {
        await dispatch(createBenefit(formData)).unwrap();
        toast.success("Benefit created successfully");
      }

      setOpen(false);
      setEditData(null);
    } catch (err) {
      toast.error("Failed to save benefit");
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Benefits Section</h2>

        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) setEditData(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditData(null)}>Add Benefit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? "Edit Benefit" : "Add Benefit"}</DialogTitle>
            <BenefitForm initialData={editData} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        open={confirmDeleteDialog}
        onOpenChange={(val) => {
          setConfirmDeleteDialog(val);
          if (!val) setBenefitToDelete(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p>Are you sure you want to delete this benefit?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setConfirmDeleteDialog(false);
                setBenefitToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">Icon</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit) => (
              <BenefitRow
                key={benefit._id}
                benefit={benefit}
                onEdit={handleEdit}
                onConfirmDelete={handleConfirmDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
