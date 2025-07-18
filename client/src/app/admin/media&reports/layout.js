"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMediaReports,
  deleteMediaReport,
} from "@/redux/slices/mediaReport-slice";

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

function Row({ mediaReport, onEdit, onDelete }) {
  return (
    <tr className="border-t bg-white">
      <td className="p-2">
        <Image
          src={mediaReport.iconUrl}
          alt="media report icon"
          width={40}
          height={40}
          className="rounded"
        />
      </td>
      <td className="p-2 font-medium">{mediaReport.title}</td>
      <td className="p-2 max-w-60">
        {mediaReport.description?.length > 400
          ? mediaReport.description.slice(0, 400) + "..."
          : mediaReport.description}
      </td>
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
}

export default function MediaReportTable() {
  const dispatch = useDispatch();
  const { mediaReports, loading } = useSelector((state) => state.mediaReports);

  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchMediaReports());
  }, [dispatch]);

  const handleEdit = (mediaReport) => {
    setEditData(mediaReport);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteMediaReport(deleteTarget._id)).unwrap();
      toast.success("Media report deleted");
    } catch (err) {
      toast.error("Failed to delete media report");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleFormSubmit = (success) => {
    if (success) {
      toast.success(editData ? "Media report updated" : "Media report created");
      setOpen(false);
      setEditData(null);
    } else {
      toast.error("Failed to save media report");
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
        <h2 className="text-xl font-semibold">Media Reports Section</h2>

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
            <MediaReportForm initialData={editData} onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-2 text-left">Logo</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">URL</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaReports.map((mediaReport) => (
              <Row
                key={mediaReport._id}
                mediaReport={mediaReport}
                onEdit={handleEdit}
                onDelete={(item) => setDeleteTarget(item)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
