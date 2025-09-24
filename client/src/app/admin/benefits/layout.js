"use client";

<<<<<<< HEAD
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

=======
import React, { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {fetchBenefits,updateBenefit, deleteBenefit, createBenefit} from "@/redux/slices/benefit-slice/index";
import { Button } from "@/components/ui/button";
import {Dialog,DialogTrigger, DialogContent, DialogTitle} from "@/components/ui/dialog";
>>>>>>> completed
import { Pencil, Trash, Loader2 } from "lucide-react";
import BenefitForm from "./page";
import { toast } from "react-toastify";

<<<<<<< HEAD
function BenefitRow({ benefit, onEdit, onConfirmDelete }) {
  return (
    <tr className="border-t bg-white">
      <td className="p-2 shadow-2xl bg-black">
=======
const BenefitRow = memo(({ benefit, onEdit, onConfirmDelete }) => {
  const truncatedDescription = benefit.description?.length > 400 
    ? benefit.description.slice(0, 400) + "..." 
    : benefit.description;

  return (
    <tr className="border-t bg-white">
      <td className="p-2 bg-black">
>>>>>>> completed
        <Image
          src={benefit.iconUrl}
          alt="benefit icon"
          width={40}
          height={40}
          className="rounded"
<<<<<<< HEAD
=======
          loading="lazy"
>>>>>>> completed
        />
      </td>

      <td className="p-2 font-medium">{benefit.title}</td>

      <td className="p-2 max-w-60">
<<<<<<< HEAD
        {benefit.description?.length > 400
          ? benefit.description.slice(0, 400) + "..."
          : benefit.description}
      </td>

      <td className="p-2 space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(benefit)}>
=======
        {truncatedDescription}
      </td>

      <td className="p-2 space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onEdit(benefit)}
          aria-label={`Edit ${benefit.title}`}
        >
>>>>>>> completed
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onConfirmDelete(benefit)}
<<<<<<< HEAD
=======
          aria-label={`Delete ${benefit.title}`}
>>>>>>> completed
        >
          <Trash className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
<<<<<<< HEAD
}
=======
});

BenefitRow.displayName = 'BenefitRow';

const DIALOG_TITLES = {
  EDIT: "Edit Benefit",
  ADD: "Add Benefit",
  DELETE: "Confirm Deletion"
};

const TOAST_MESSAGES = {
  FETCH_ERROR: "Failed to fetch benefits",
  DELETE_SUCCESS: "Benefit deleted successfully",
  DELETE_ERROR: "Failed to delete benefit",
  UPDATE_SUCCESS: "Benefit updated successfully",
  CREATE_SUCCESS: "Benefit created successfully",
  SAVE_ERROR: "Failed to save benefit"
};
>>>>>>> completed

export default function BenefitTable() {
  const dispatch = useDispatch();
  const { benefits, loading } = useSelector((state) => state.benefits);
<<<<<<< HEAD

=======
>>>>>>> completed
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [benefitToDelete, setBenefitToDelete] = useState(null);

<<<<<<< HEAD
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
=======
  const loadBenefits = useCallback(() => {
    dispatch(fetchBenefits())
      .unwrap()
      .catch(() => toast.error(TOAST_MESSAGES.FETCH_ERROR));
  }, [dispatch]);

  useEffect(() => {
    loadBenefits();
  }, [loadBenefits]);

  const handleEdit = useCallback((benefit) => {
    setEditData(benefit);
    setOpen(true);
  }, []);

  const handleConfirmDelete = useCallback((benefit) => {
    setBenefitToDelete(benefit);
    setConfirmDeleteDialog(true);
  }, []);

  const handleDelete = useCallback(async () => {
>>>>>>> completed
    if (!benefitToDelete) return;

    try {
      await dispatch(deleteBenefit(benefitToDelete._id)).unwrap();
<<<<<<< HEAD
      toast.success("Benefit deleted successfully");
    } catch (err) {
      toast.error("Failed to delete benefit");
=======
      toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
    } catch (err) {
      toast.error(TOAST_MESSAGES.DELETE_ERROR);
>>>>>>> completed
    } finally {
      setConfirmDeleteDialog(false);
      setBenefitToDelete(null);
    }
<<<<<<< HEAD
  };

  const handleSubmit = async ({ title, description, icon }) => {
=======
  }, [benefitToDelete, dispatch]);

  const handleSubmit = useCallback(async ({ title, description, icon }) => {
>>>>>>> completed
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);

    try {
      if (editData) {
        await dispatch(updateBenefit({ id: editData._id, formData })).unwrap();
<<<<<<< HEAD
        toast.success("Benefit updated successfully");
      } else {
        await dispatch(createBenefit(formData)).unwrap();
        toast.success("Benefit created successfully");
=======
        toast.success(TOAST_MESSAGES.UPDATE_SUCCESS);
      } else {
        await dispatch(createBenefit(formData)).unwrap();
        toast.success(TOAST_MESSAGES.CREATE_SUCCESS);
>>>>>>> completed
      }

      setOpen(false);
      setEditData(null);
    } catch (err) {
<<<<<<< HEAD
      toast.error("Failed to save benefit");
    }
  };
=======
      toast.error(TOAST_MESSAGES.SAVE_ERROR);
    }
  }, [editData, dispatch]);

  const handleAddDialogChange = useCallback((val) => {
    setOpen(val);
    if (!val) setEditData(null);
  }, []);

  const handleDeleteDialogChange = useCallback((val) => {
    setConfirmDeleteDialog(val);
    if (!val) setBenefitToDelete(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditData(null);
    setOpen(true);
  }, []);
>>>>>>> completed

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

<<<<<<< HEAD
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
=======
        <Dialog open={open} onOpenChange={handleAddDialogChange}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>Add Benefit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? DIALOG_TITLES.EDIT : DIALOG_TITLES.ADD}</DialogTitle>
>>>>>>> completed
            <BenefitForm initialData={editData} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

<<<<<<< HEAD
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
=======
      <Dialog open={confirmDeleteDialog} onOpenChange={handleDeleteDialogChange}>
        <DialogContent>
          <DialogTitle>{DIALOG_TITLES.DELETE}</DialogTitle>
>>>>>>> completed
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
<<<<<<< HEAD
            <tr>
              <th className="p-2 text-left">Icon</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
=======
            <tr className="bg-gray-50">
              <th className="p-2 text-left font-semibold">Icon</th>
              <th className="p-2 text-left font-semibold">Title</th>
              <th className="p-2 text-left font-semibold">Description</th>
              <th className="p-2 text-left font-semibold">Actions</th>
>>>>>>> completed
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
<<<<<<< HEAD
}
=======
}
>>>>>>> completed
