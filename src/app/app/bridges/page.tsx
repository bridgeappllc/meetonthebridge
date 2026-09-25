"use client";

import Link from "next/link";
import { TopBar } from "@/components/ui";
import { contentById, friendById, useStore } from "@/lib/store";

export default function Bridges() {
  const { bridges, friends, library, acceptBridge, declineBridge } = useStore();
  const pending = bridges.filter((b) => b.status === "pending");
  const active = bridges.filter((b) => b.status !== "pending");

  return (
    <div>
      <TopBar title="Bridges" />
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-500">
          Pending Invites {pending.length}
        </h2>
        <div className="mt-2 space-y-3">
          {pending.map((b) => {
            const f = friendById(b.friendId, friends);
            const c = contentById(b.contentId, library);
            return (
              <div key={b.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <img src={f?.avatar} alt="" className="h-11 w-11 rounded-full" />
                  <div>
                    <div className="font-semibold">{f?.name}</div>
                    <div className="text-xs text-slate-500">
                      Invited you · {b.invitedAgo}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium">{c?.title}</p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/app/bridges/${b.id}`}
                    onClick={() => acceptBridge(b.id)}
                    className="flex-1 rounded-full bg-[#2b6cff] py-2 text-center text-sm font-semibold text-white"
                  >
                    Accept
                  </Link>
                  <button
                    onClick={() => declineBridge(b.id)}
                    className="flex-1 rounded-full border border-slate-300 py-2 text-sm font-semibold"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="mt-6 text-sm font-semibold text-slate-500">
          Active Bridges {active.length}
        </h2>
        <div className="mt-2 space-y-3">
          {active.map((b) => {
            const f = friendById(b.friendId, friends);
            return (
              <Link
                key={b.id}
                href={b.status === "built" ? `/app/bridges/${b.id}/built` : `/app/bridges/${b.id}`}
                className="block rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <img src={f?.avatar} alt="" className="h-11 w-11 rounded-full" />
                  <div>
                    <div className="font-semibold">{f?.name}</div>
                    <div className="text-xs text-slate-500">
                      Last active: {b.lastActive}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  {b.progress} of 10 agreements · {b.status === "built" ? "Built" : "In Progress"}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-[#2b6cff]"
                    style={{ width: `${Math.min(100, (b.progress / 10) * 100)}%` }}
                  />
                </div>
                <div className="mt-3 rounded-full bg-[#2b6cff] py-2 text-center text-sm font-semibold text-white">
                  Continue Bridge
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
