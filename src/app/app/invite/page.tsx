"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { TopBar } from "@/components/ui";
import { contentById, useStore } from "@/lib/store";

function InviteInner() {
  const params = useSearchParams();
  const contentId = params.get("content") || "c3";
  const { friends, library, createInvite } = useStore();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(["f1", "f3"]);
  const [note, setNote] = useState("");
  const item = contentById(contentId, library);
  const message = useMemo(
    () =>
      `Let’s find 10 things we agree on before we debate the rest. I shared ${item?.title ?? "this"} — read it and tell me where you stand.`,
    [item]
  );

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <div>
      <TopBar title="Invite a friend to the Bridge" back="/app" />
      <div className="px-5 py-4">
        <h2 className="text-xl font-extrabold">Select Recipient</h2>
        <input className="field mt-3" placeholder="Search friends or contacts..." />
        <div className="mt-3 space-y-2">
          {friends.map((f) => {
            const on = selected.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggle(f.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left ${
                  on ? "border-[#2b6cff] bg-[#f3f7ff]" : "border-slate-200"
                }`}
              >
                <img src={f.avatar} alt="" className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold">{f.name}</div>
                  <div
                    className={`text-xs ${
                      f.presence === "Active" ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    {f.presence}
                  </div>
                </div>
                {on && (
                  <span className="text-sm font-semibold text-[#2b6cff]">
                    Selected ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Invitation message
        </p>
        <div className="mt-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
          {message}
        </div>
        <label className="mt-4 block text-sm font-medium">
          Add an Optional Note
          <input
            className="field mt-1"
            maxLength={250}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Hey [Name], check this out..."
          />
          <div className="mt-1 text-right text-xs text-slate-400">
            {note.length}/250
          </div>
        </label>
        <button
          className="btn-primary mt-4"
          disabled={selected.length === 0}
          onClick={() => {
            const id = createInvite(selected, contentId, note);
            router.push(`/app/bridges/${id}`);
          }}
        >
          Send Invite ({selected.length})
        </button>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <InviteInner />
    </Suspense>
  );
}
