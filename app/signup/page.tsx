"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Save display name
      await updateProfile(cred.user, { displayName: name });

      router.push("/signin"); // or /dashboard
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#111] border border-yellow-400/30 shadow-[0_0_30px_rgba(255,215,0,0.25)]">
        <h1 className="text-3xl font-bold text-yellow-300 text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              placeholder="••••••••"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              placeholder="••••••••"
              name="confirm"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-yellow-400 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </main>
  );
}
