"use client";

import Link from "next/link";
import { TopBar } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function Profile() {
  const { user, library, bridges, logout } = useStore();
  const sent = bridges.length;
  const read = library.length;

  return (
    <div>
      <TopBar title="Profile" />
      <div className="px-5 py-5">
        <div className="rounded-3xl bg-[#0f1b33] p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2b6cff] text-2xl font-bold">
              {user?.name?.[0] || "Y"}
            </div>
            <div>
              <div className="text-xl font-bold">{user?.name}</div>
              <div className="text-sm text-slate-300">@{user?.handle}</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300">{user?.bio}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white/10 py-2">
              <div className="text-lg font-bold">{sent}</div>
              <div className="text-xs text-slate-300">Sent</div>
            </div>
            <div className="rounded-xl bg-white/10 py-2">
              <div className="text-lg font-bold">{read}</div>
              <div className="text-xs text-slate-300">In library</div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-4 text-sm font-semibold">
          <span className="border-b-2 border-[#2b6cff] pb-1 text-[#2b6cff]">
            Library
          </span>
          <Link href="/app/bridges" className="text-slate-400">
            Bridges
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {library.map((c) => (
            <Link
              key={c.id}
              href={`/app/content/${c.id}`}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >
              <img src={c.image} alt="" className="h-24 w-full object-cover" />
              <div className="p-2">
                <div className="line-clamp-2 text-xs font-bold">{c.title}</div>
                <div className="mt-1 text-[10px] text-[#2b6cff]">
                  #{c.category}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="mt-6 w-full py-3 text-sm font-medium text-slate-400"
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
