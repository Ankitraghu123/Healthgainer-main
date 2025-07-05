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

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  defaultKeyboardCoordinateGetter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash, Loader2 } from "lucide-react";
import BenefitForm from "./page";

function SortableRow({ benefit, index, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: benefit._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-t bg-white">
      <td
        className="p-2 pl-6 cursor-grab select-none text-gray-500"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        ☰
      </td>

      <td className="p-2">
        <Image
          src={benefit.iconUrl}
        // src="https://ik.imagekit.io/ch0wxnp882/benefits/benefit_1751557948657_3fLt3Cdxo.jpg"
          alt="benefit icon"
          width={40}
          height={40}
          className="rounded"
        />
      </td>

      <td className="p-2 font-medium">{benefit.title}</td>
      <td className="p-2 max-w-60">{benefit.description?.length > 400 ? benefit.description?.slice(0, 400) + "..." : benefit.description}</td>
      <td className="p-2 space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(benefit)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(benefit._id)}
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

  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: defaultKeyboardCoordinateGetter })
  );

  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  useEffect(() => {
    if (benefits?.length) {
      const sorted = [...benefits].sort((a, b) => a.sno - b.sno);
      setItems(sorted);
    }
  }, [benefits]);

  const handleEdit = (benefit) => {
    setEditData(benefit);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBenefit(id)).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await dispatch(
          updateBenefit({ id: editData._id, ...formData })
        ).unwrap();
      } else {
        await dispatch(createBenefit(formData)).unwrap();
      }

      setOpen(false);
      setEditData(null);
    } catch (err) {
      console.error("Form submit failed", err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item._id === active.id);
    const newIndex = items.findIndex((item) => item._id === over.id);
    const reordered = arrayMove(items, oldIndex, newIndex);

    setItems(reordered);

    try {
      for (let i = 0; i < reordered.length; i++) {
        if (reordered[i].sno !== i + 1) {
          await dispatch(
            updateBenefit({ id: reordered[i]._id, sno: i + 1 })
          ).unwrap();
        }
      }
    } catch (err) {
      console.error("Reordering failed", err);
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

      <div className="border rounded-md overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((b) => b._id)}
            strategy={verticalListSortingStrategy}
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="p-2 text-left">Reorder</th>
                  <th className="p-2 text-left">Icon</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((benefit, index) => (
                  <SortableRow
                    key={benefit._id}
                    benefit={benefit}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
