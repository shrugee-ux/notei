"use client";

import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function NoteList({ notes }: { notes: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!notes.length) {
    return <p className="text-gray-500 text-center">No notes yet.</p>;
  }

  const copyDiscordLink = async (id: string) => {
    const url = `${window.location.origin}/note/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="grid gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-[#111] border border-yellow-400/30 rounded-xl overflow-hidden"
        >
          {note.imageURL && (
            <img
              src={note.imageURL}
              alt={note.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4 space-y-3">
            <h2 className="text-xl font-bold text-yellow-300">
              {note.title}
            </h2>

            <div className="prose prose-invert max-w-none max-h-40 overflow-hidden">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>

            <div className="flex gap-4 text-sm">
              <a
                href={`/note/${note.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                Open public link →
              </a>

              <button
                onClick={() => copyDiscordLink(note.id)}
                className="text-yellow-400 hover:underline"
              >
                {copiedId === note.id
                  ? "Copied!"
                  : "Copy Discord embed URL"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
