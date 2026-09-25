"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo, Phone } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function Landing() {
  const { user, ready } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (ready && user) router.replace("/app");
  }, [ready, user, router]);

  return (
    <Phone>
      <div className="flex min-h-[100dvh] flex-col px-6 pb-8 pt-8">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-xl text-slate-400">☰</span>
        </div>

        <div className="mt-10 text-center">
          <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#0f1b33]">
            Bridge App
          </h1>
          <p className="mt-3 text-[20px] font-semibold leading-snug text-[#0f1b33]">
            We don’t have to agree to understand each other.
          </p>
          <p className="mx-auto mt-3 max-w-[280px] text-[15px] text-slate-500">
            Find 10 things you agree on before you debate the rest.
          </p>
        </div>

        <div className="relative mx-auto mt-8 h-52 w-full max-w-sm">
          <div className="absolute inset-x-6 top-6 h-40 rounded-[40px] bg-[#e8f0ff]" />
          <svg viewBox="0 0 320 180" className="relative z-10 mx-auto h-full w-full">
            <circle cx="110" cy="78" r="28" fill="#f3d7c4" />
            <circle cx="210" cy="78" r="28" fill="#c9a882" />
            <rect x="82" y="108" width="56" height="48" rx="16" fill="#2b6cff" />
            <rect x="182" y="108" width="56" height="48" rx="16" fill="#eef2f7" />
            <path
              d="M138 88c14-18 30-18 44 0"
              stroke="#7aa2ff"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

        <div className="mt-auto space-y-3">
          <Link href="/signup" className="btn-primary">
            Sign Up Free
          </Link>
          <Link href="/login" className="btn-secondary">
            I Have an Account
          </Link>
          <p className="pt-2 text-center text-xs text-slate-400">
            Privacy Policy · Terms of Service
          </p>
        </div>
      </div>
    </Phone>
  );
}
