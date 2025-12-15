export const runtime = "edge";

import { getNoteById } from "@/lib/firestore-rest";
import PublicNoteClient from "./public-note-client";

export async function generateMetadata({ params }: any) {
  const note = await getNoteById(params.id);
  if (!note) return {};

  const description = note.content.slice(0, 150);

  return {
    title: note.title,
    description,
    openGraph: {
      title: note.title,
      description,
      images: note.imageURL ? [note.imageURL] : [],
      type: "article",
    },
    twitter: {
      card: note.imageURL ? "summary_large_image" : "summary",
      title: note.title,
      description,
      images: note.imageURL ? [note.imageURL] : [],
    },
  };
}

export default function Page({ params }: any) {
  return <PublicNoteClient id={params.id} />;
}
