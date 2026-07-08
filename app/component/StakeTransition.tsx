"use client";

import StakeLogo from "./StakeLogo";

export default function StakeTransition() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1D2C37]">
      <span className="stake-diagonal-text">
        <StakeLogo className="w-56 h-auto text-white" />
      </span>
    </div>
  );
}
