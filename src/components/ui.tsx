"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Phone({ children }: { children: React.ReactNode }) {
  return <div className="phone-shell">{children}</div>;
}

export function TopBar({
  title,
  back,
  right,
}: {
  title: string;
  back?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-white/95 px-4 py-3 backdrop-blur border-b border-slate-100">
      {back ? (
        <Link href={back} className="text-[#2b6cff] text-sm font-medium">
          ‹ Back
        </Link>
      ) : (
        <span className="w-10" />
      )}
      <h1 className="flex-1 text-center text-[17px] font-semibold tracking-tight">
        {title}
      </h1>
      <div className="min-w-10 flex justify-end">{right}</div>
    </header>
  );
}

const tabs = [
  { href: "/app", label: "Home", icon: "⌂" },
  { href: "/app/explore", label: "Explore", icon: "◎" },
  { href: "/app/bridges", label: "Bridges", icon: "⇅" },
  { href: "/app/profile", label: "Profile", icon: "☺" },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 pb-[max(10px,env(safe-area-inset-bottom))]">
      {tabs.map((t) => {
        const on =
          t.href === "/app"
            ? path === "/app"
            : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center gap-0.5 py-1 text-[11px] ${
              on ? "text-[#2b6cff] font-semibold" : "text-slate-400"
            }`}
          >
            <span className="text-lg leading-none">{t.icon}</span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
        <path
          d="M2 16c4-10 8-10 12 0 4-10 8-10 12 0"
          stroke={dark ? "#fff" : "#2b6cff"}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className={`text-lg font-bold ${dark ? "text-white" : "text-[#0f1b33]"}`}>
        Bridge
      </span>
    </div>
  );
}
