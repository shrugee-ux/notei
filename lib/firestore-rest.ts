const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export async function getNoteById(id: string) {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/notes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const json = await res.json();

  const fields = json.fields;

  return {
    title: fields.title?.stringValue ?? "",
    content: fields.content?.stringValue ?? "",
    imageURL: fields.imageURL?.stringValue ?? "",
  };
}
