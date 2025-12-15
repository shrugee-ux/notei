"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { useRouter } from "next/navigation";
import CreateNote from "./create-note";
import NoteList from "./note-list";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/signin");
      else setUser(u);
    });
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
  collectionGroup(db, "notes"),
  where("uid", "==", user.uid)
);





    return onSnapshot(q, (snap) => {
        console.log("SNAPSHOT SIZE:", snap.size);
  console.log(
    "DOCS:",
    snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  );
      setNotes(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });
  }, [user]);

  if (!user) return null;

return (
  <main className="min-h-screen bg-neutral-900 text-white flex justify-center p-8">
    <div className="w-full max-w-3xl space-y-10">
      <h1 className="text-3xl font-bold text-yellow-300 text-center">
        Dashboard
      </h1>

      <CreateNote user={user} />

      <NoteList notes={notes} />
    </div>
  </main>
);


}
