"use client";

export default function StakeTransition() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D2C37]">
      <span className="stake-diagonal-text text-5xl font-semibold tracking-tight">
        <div className="stake-logo text-[72px] leading-none flex justify-center items-center">
            <h1 className="stake-logo text-[44px] font-bold text-white mb-4 leading-none">S</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">t</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">a</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">k</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-4 leading-none">e</h1>
          </div>
      </span>
    </div>
  );
}
