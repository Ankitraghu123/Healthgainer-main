"use client";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState, useCallback, memo } from "react";
>>>>>>> completed
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMediaReports,
  deleteMediaReport,
} from "@/redux/slices/mediaReport-slice";
<<<<<<< HEAD

=======
>>>>>>> completed
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Loader2 } from "lucide-react";
import MediaReportForm from "./page";
import ConfirmDelete from "@/components/common/ConfirmDelete";
import { toast } from "react-toastify";

<<<<<<< HEAD
function Row({ mediaReport, onEdit, onDelete }) {
=======
const Row = memo(({ mediaReport, onEdit, onDelete }) => {
  const truncatedDesc = mediaReport.description?.length > 400 
    ? mediaReport.description.slice(0, 400) + "..." 
    : mediaReport.description;

>>>>>>> completed
  return (
    <tr className="border-t bg-white">
      <td className="p-2">
        <Image
          src={mediaReport.iconUrl}
          alt="media report icon"
          width={40}
          height={40}
          className="rounded"
<<<<<<< HEAD
        />
      </td>
      <td className="p-2 font-medium">{mediaReport.title}</td>
      <td className="p-2 max-w-60">
        {mediaReport.description?.length > 400
          ? mediaReport.description.slice(0, 400) + "..."
          : mediaReport.description}
      </td>
=======
          loading="lazy"
        />
      </td>
      <td className="p-2 font-medium">{mediaReport.title}</td>
      <td className="p-2 max-w-60">{truncatedDesc}</td>
>>>>>>> completed
      <td className="p-2 max-w-60 break-all">
        {mediaReport.url}{" "}
        <a
          href={mediaReport.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sky-600"
        >
          visit
        </a>
      </td>
      <td className="p-2 space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(mediaReport)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(mediaReport)}
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

Row.displayName = 'MediaReportRow';
>>>>>>> completed

export default function MediaReportTable() {
  const dispatch = useDispatch();
  const { mediaReports, loading } = useSelector((state) => state.mediaReports);
<<<<<<< HEAD

=======
>>>>>>> completed
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    dispatch(fetchMediaReports());
  }, [dispatch]);

  const handleEdit = (mediaReport) => {
    setEditData(mediaReport);
    setOpen(true);
  };

  const handleDelete = async () => {
=======
  const handleEdit = useCallback((mediaReport) => {
    setEditData(mediaReport);
    setOpen(true);
  }, []);

  const handleDelete = useCallback(async () => {
>>>>>>> completed
    if (!deleteTarget) return;
    try {
      await dispatch(deleteMediaReport(deleteTarget._id)).unwrap();
      toast.success("Media report deleted");
    } catch (err) {
      toast.error("Failed to delete media report");
    } finally {
      setDeleteTarget(null);
    }
<<<<<<< HEAD
  };

  const handleFormSubmit = (success) => {
=======
  }, [deleteTarget, dispatch]);

  const handleFormSubmit = useCallback((success) => {
>>>>>>> completed
    if (success) {
      toast.success(editData ? "Media report updated" : "Media report created");
      setOpen(false);
      setEditData(null);
    } else {
      toast.error("Failed to save media report");
    }
<<<<<<< HEAD
  };
=======
  }, [editData]);

  const handleDialogChange = useCallback((val) => {
    setOpen(val);
    if (!val) setEditData(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditData(null);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  useEffect(() => {
    dispatch(fetchMediaReports());
  }, [dispatch]);
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
        <h2 className="text-xl font-semibold">Media Reports Section</h2>

<<<<<<< HEAD
        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) setEditData(null);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditData(null)}>Add Media Report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editData ? "Edit Media Report" : "Add Media Report"}</DialogTitle>
=======
        <Dialog open={open} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>Add Media Report</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogTitle className="text-lg font-semibold">
              {editData ? "Edit Media Report" : "Add Media Report"}
            </DialogTitle>
>>>>>>> completed
            <MediaReportForm initialData={editData} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md overflow-hidden">
<<<<<<< HEAD
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">Logo</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">URL</th>
              <th className="p-2 text-left">Actions</th>
=======
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left text-sm font-medium">Logo</th>
              <th className="p-2 text-left text-sm font-medium">Title</th>
              <th className="p-2 text-left text-sm font-medium">Description</th>
              <th className="p-2 text-left text-sm font-medium">URL</th>
              <th className="p-2 text-left text-sm font-medium">Actions</th>
>>>>>>> completed
            </tr>
          </thead>
          <tbody>
            {mediaReports.map((mediaReport) => (
              <Row
                key={mediaReport._id}
                mediaReport={mediaReport}
                onEdit={handleEdit}
<<<<<<< HEAD
                onDelete={(item) => setDeleteTarget(item)}
=======
                onDelete={setDeleteTarget}
>>>>>>> completed
              />
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        open={!!deleteTarget}
<<<<<<< HEAD
        onCancel={() => setDeleteTarget(null)}
=======
        onCancel={handleDeleteCancel}
>>>>>>> completed
        onConfirm={handleDelete}
      />
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> completed
