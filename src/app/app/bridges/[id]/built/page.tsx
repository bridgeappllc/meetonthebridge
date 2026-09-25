"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Phone } from "@/components/ui";

export default function Built() {
  const { id } = useParams<{ id: string }>();
  return (
    <Phone>
      <div className="flex min-h-[80dvh] flex-col items-center px-6 pb-8 pt-12 text-center">
        <p className="text-4xl">🎉</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[#2b6cff]">
          Bridge Built!
        </h1>
        <p className="mt-2 text-lg font-medium text-slate-700">
          You found 10 things you agree on.
        </p>
        <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#e8f0ff] text-6xl">
          🤝
        </div>
        <div className="mt-auto w-full space-y-3">
          <Link href={`/app/bridges/${id}/talk`} className="btn-primary">
            Start Socratic Discussion
          </Link>
          <Link href="/app/bridges" className="btn-secondary">
            Save Bridge
          </Link>
        </div>
      </div>
    </Phone>
  );
}
