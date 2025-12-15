"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import CreateNote from "./create-note";
import NoteList from "./note-list";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);

  // 🔐 Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/signin");
      } else {
        setUser(u);
      }
    });

    return () => unsub();
  }, [router]);

  // 📄 Notes listener (NO index required)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      console.log("SNAPSHOT SIZE:", snap.size);
      console.log(
        "DOCS:",
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );

      setNotes(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return () => unsub();
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
