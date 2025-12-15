export const runtime = "edge";

import { getNoteById } from "@/lib/firestore-rest";
import PublicNoteClient from "./public-note-client";


export async function generateMetadata({ params }: { params: { id: string } }) {
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
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description,
      images: note.imageURL ? [note.imageURL] : [],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <PublicNoteClient id={params.id} />;
}
