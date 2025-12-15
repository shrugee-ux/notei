"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export default function PublicNoteClient({ id }: { id: string }) {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const ref = doc(db, "notes", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setNote(null);
      } else {
        setNote(snap.data());
      }

      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) return null;
  if (!note) return notFound();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-300">
        {note.title}
      </h1>

      <div className="prose prose-invert max-w-none mt-4">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>

      {note.imageURL && (
        <img src={note.imageURL} className="mt-6 rounded-xl" />
      )}
    </main>
  );
}
