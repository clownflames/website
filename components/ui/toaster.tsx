"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * App-wide toast host (sonner). Styled to match the paper/ink design tokens so
 * success and error feedback looks native instead of borrowing another app's look.
 */
export function Toaster() {
  return (
    <SonnerToaster
      closeButton
      gap={10}
      offset={18}
      position="bottom-right"
      toastOptions={{
        duration: 4500,
        style: {
          borderRadius: "0.95rem",
          border: "1px solid var(--line)",
          background: "#ffffff",
          color: "var(--ink)",
          padding: "13px 15px",
          boxShadow: "0 24px 60px -32px rgba(10, 12, 18, 0.45)",
          fontFamily: "inherit",
        },
        classNames: {
          title: "text-[0.85rem] font-semibold",
          description: "text-[0.78rem] leading-5 opacity-60",
          actionButton: "rounded-full bg-ink px-3 text-[0.75rem] text-paper",
          cancelButton: "rounded-full bg-cream px-3 text-[0.75rem] text-ink",
          closeButton: "border-line bg-white text-ink/50 hover:text-ink",
        },
      }}
    />
  );
}
