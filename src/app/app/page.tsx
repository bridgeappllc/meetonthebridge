"use client";

import Link from "next/link";
import { SEED_CONTENT } from "@/lib/data";
import { useStore } from "@/lib/store";

const filters = ["All", "Politics", "Economics", "Culture"];

export default function Feed() {
  const { user } = useStore();

  return (
    <div>
      <div className="flex items-end justify-between px-5 pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2b6cff]">
            FEED
          </p>
          <h1 className="text-2xl font-extrabold">Discover</h1>
        </div>
        <Link
          href="/app/library/add"
          className="rounded-full bg-[#2b6cff] px-3 py-1.5 text-sm font-semibold text-white"
        >
          + Add
        </Link>
      </div>
      <p className="px-5 pt-1 text-sm text-slate-500">
        Hi {user?.name.split(" ")[0]}. Share something, then meet on the Bridge.
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-2">
        {filters.map((f, i) => (
          <span
            key={f}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
              i === 0 ? "bg-[#2b6cff] text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="space-y-3 px-5 py-4">
        {SEED_CONTENT.map((c) => (
          <Link
            key={c.id}
            href={`/app/content/${c.id}`}
            className="block overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="flex gap-3 p-3">
              <img
                src={c.image}
                alt=""
                className="h-20 w-24 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {c.category}
                </span>
                <h2 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug">
                  {c.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {c.subtitle}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Community {c.communityRating.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
