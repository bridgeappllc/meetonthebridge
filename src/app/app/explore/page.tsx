"use client";

import Link from "next/link";
import { SEED_FRIENDS } from "@/lib/data";
import { TopBar } from "@/components/ui";

export default function Explore() {
  return (
    <div>
      <TopBar title="Explore" />
      <div className="px-5 py-4">
        <p className="text-sm text-slate-500">
          Profiles you can invite to Meet on the Bridge.
        </p>
        <div className="mt-4 space-y-3">
          {SEED_FRIENDS.map((f) => (
            <Link
              key={f.id}
              href={`/app/people/${f.id}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
            >
              <img src={f.avatar} alt="" className="h-12 w-12 rounded-full" />
              <div className="flex-1">
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs text-slate-500">@{f.handle}</div>
              </div>
              <span
                className={`text-xs font-medium ${
                  f.presence === "Active" ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {f.presence}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
