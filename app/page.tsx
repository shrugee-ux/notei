export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black">
      <h1 className="text-4xl font-bold text-yellow-300">
        iNote
      </h1>

      <p className="text-gray-400">
        Write, save, and organize your notes in one place.
      </p>

      <div className="flex gap-4">
        {/* Sign In */}
        <a
          href="/signin"
          className="
            relative overflow-hidden
            px-6 py-2 rounded-md
            border border-yellow-400/40
            bg-[#111]
            text-yellow-300 font-medium
            transition-all duration-500
            hover:scale-[1.05]
            hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]

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
          Sign In
        </a>

        {/* Sign Up */}
        <a
          href="/signup"
          className="
            relative overflow-hidden
            px-6 py-2 rounded-md
            bg-[#111]
            border border-yellow-400/40
            text-yellow-300 font-medium
            transition-all duration-500
            hover:scale-[1.05]
            hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]

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
          Sign Up
        </a>
      </div>
    </main>
  );
}

