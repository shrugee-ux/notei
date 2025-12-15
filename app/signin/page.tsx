"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // change if needed
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#111] border border-yellow-400/30 shadow-[0_0_30px_rgba(255,215,0,0.25)]">
        <h1 className="text-3xl font-bold text-yellow-300 text-center mb-6">
          Sign In
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="
                w-full px-4 py-2 rounded-md
                bg-black border border-gray-700
                text-white
                focus:outline-none focus:border-yellow-400
                focus:ring-1 focus:ring-yellow-400/50
              "
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="
                w-full px-4 py-2 rounded-md
                bg-black border border-gray-700
                text-white
                focus:outline-none focus:border-yellow-400
                focus:ring-1 focus:ring-yellow-400/50
              "
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              relative overflow-hidden w-full mt-4
              px-6 py-2 rounded-md
              bg-[#111]
              text-yellow-300 font-medium
              transition-all duration-500
              hover:scale-[1.03]
              hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
              disabled:opacity-50
              disabled:cursor-not-allowed

              before:content-['']
              before:absolute
              before:top-[-50%]
              before:left-[-50%]
              before:w-[200%]
              before:h-[200%]
              before:rotate-[-45deg]
              before:opacity-0
              before:transition-all
              before:duration-500
              before:bg-[linear-gradient(0deg,transparent,transparent_30%,rgba(255,215,0,0.35))]

              hover:before:opacity-100
              hover:before:translate-y-full
            "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-yellow-400 hover:text-yellow-300 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
