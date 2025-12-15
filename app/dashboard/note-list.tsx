"use client";

import ReactMarkdown from "react-markdown";

export default function NoteList({ notes }: { notes: any[] }) {
  if (!notes.length) {
    return (
      <p className="text-gray-500 text-center">
        No notes yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-[#111] border border-yellow-400/30 rounded-xl overflow-hidden"
        >
          {note.imageURL && (
            <a
              href={note.imageURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={note.imageURL}
                alt={note.title}
                className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
              />
            </a>
          )}

          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold text-yellow-300">
              {note.title}
            </h2>

            <div className="prose prose-invert max-w-none max-h-40 overflow-hidden">
              <ReactMarkdown>
                {note.content}
              </ReactMarkdown>
            </div>

            <a
              href={`/note/${note.id}`}
              target="_blank"
              className="inline-block text-yellow-400 text-sm hover:underline"
            >
              Open public link →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
