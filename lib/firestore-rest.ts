const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

export async function getNoteById(id: string) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/notes/${id}?key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;

  const data = await res.json();
  if (!data.fields) return null;

  const f = data.fields;

  return {
    title: f.title?.stringValue ?? "",
    content: f.content?.stringValue ?? "",
    imageURL: f.imageURL?.stringValue ?? null,
  };
}
