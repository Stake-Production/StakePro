"use client";

import { useState } from "react";
import StakeTransition from "./StakeTransition";

export default function StakeLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowTransition(true)}
        className="cursor-pointer"
      >
        {children}
      </button>

      {showTransition && <StakeTransition to={href} />}
    </>
  );
}
