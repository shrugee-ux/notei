"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreateNote({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dhsrpztqm/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();
  return data.secure_url as string;
};


  const handleCreate = async () => {
  if (!title || !content) return;
  setLoading(true);

  let imageURL = "";

  try {
    if (file) {
      imageURL = await uploadToCloudinary(file);
    }

    await addDoc(collection(db, "notes"), {
      uid: user.uid,
      title,
      content,
      imageURL,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setContent("");
    setFile(null);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert("Image upload failed — check console");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-[#111] border border-yellow-400/30 rounded-2xl p-6 space-y-4">
      {/* Title */}
      <input
        placeholder="Title"
        className="w-full p-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-yellow-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content */}
      <textarea
        placeholder="Note content (Markdown supported)"
        className="w-full min-h-[120px] p-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-yellow-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* File upload */}
      <label className="block">
        <span className="text-sm text-gray-400">
          Image (optional)
        </span>
        <input
          type="file"
          accept="image/*"
          className="
            relative overflow-hidden w-full mt-4
              px-6 py-2 rounded-md
              bg-[#111]
              text-yellow-300 font-medium
              transition-all duration-500
              hover:scale-[1.03]
              hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
              disabled:opacity-50
              disabled:cursor-not-allowed

              before:content-['']
              before:absolute
              before:top-[-50%]
              before:left-[-50%]
              before:w-[200%]
              before:h-[200%]
              before:rotate-[-45deg]
              before:opacity-0
              before:transition-all
              before:duration-500
              before:bg-[linear-gradient(0deg,transparent,transparent_30%,rgba(255,215,0,0.35))]

              hover:before:opacity-100
              hover:before:translate-y-full
          "
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
        
      {/* Button */}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="
          relative overflow-hidden w-full mt-4
              px-6 py-2 rounded-md
              bg-[#111]
              text-yellow-300 font-medium
              transition-all duration-500
              hover:scale-[1.03]
              hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
              disabled:opacity-50
              disabled:cursor-not-allowed

              before:content-['']
              before:absolute
              before:top-[-50%]
              before:left-[-50%]
              before:w-[200%]
              before:h-[200%]
              before:rotate-[-45deg]
              before:opacity-0
              before:transition-all
              before:duration-500
              before:bg-[linear-gradient(0deg,transparent,transparent_30%,rgba(255,215,0,0.35))]

              hover:before:opacity-100
              hover:before:translate-y-full
        "
      >
        {loading ? "Uploading..." : "Create Note"}
      </button>
    </div>
  );
}
