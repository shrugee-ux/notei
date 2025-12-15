export const runtime = "edge";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

/* ---------------- METADATA ---------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ref = doc(db, "notes", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return {};

  const note = snap.data();

  const title = note.title;
  const description = note.content?.slice(0, 200);
  const image = note.imageURL || "https://yourdomain.com/og-default.png";
  const url = `https://yourdomain.com/note/${id}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Optional but helps Discord/Twitter fallback behavior
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}


/* ---------------- PAGE ---------------- */

export default async function PublicNote({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ref = doc(db, "notes", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return notFound();

  const note = snap.data();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-300">
        {note.title}
      </h1>

      <div className="prose prose-invert max-w-none mt-4">
        <ReactMarkdown>
          {note.content}
        </ReactMarkdown>
      </div>

      {note.imageURL && (
        <img
          src={note.imageURL}
          alt={note.title}
          className="mt-6 rounded-xl"
        />
      )}
    </main>
  );
}
