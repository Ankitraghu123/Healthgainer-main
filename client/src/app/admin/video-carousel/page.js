"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideo,
  updateVideo,
  fetchVideos,
} from "@/redux/slices/video-carousel-slice/index";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function VideoForm({ initialData = null, onSubmit }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.videos);

  const [name, setName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setVideoUrl(initialData.videoUrl || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, videoUrl };

    try {
      if (initialData) {
        await dispatch(updateVideo({ id: initialData._id, formData })).unwrap();
      } else {
        await dispatch(createVideo(formData)).unwrap();
      }
      if (onSubmit) onSubmit();
    } catch (err) {
      console.error("Failed to submit:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Video Title</Label>
        <Input
          type="text"
          placeholder="Enter video name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label>Video URL</Label>
        <Input
          type="text"
          placeholder="Enter YouTube, Vimeo or MP4 link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? initialData
            ? "Updating..."
            : "Uploading..."
          : initialData
          ? "Update Video"
          : "Upload Video"}
      </Button>
    </form>
  );
}
