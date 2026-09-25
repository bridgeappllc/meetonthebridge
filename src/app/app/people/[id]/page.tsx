"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/ui";
import { SEED_CONTENT } from "@/lib/data";
import { friendById, useStore } from "@/lib/store";

export default function Person() {
  const { id } = useParams<{ id: string }>();
  const { friends } = useStore();
  const f = friendById(id, friends);
  if (!f) return <div className="p-6">Not found.</div>;

  return (
    <div>
      <TopBar title={f.name} back="/app/explore" />
      <div className="px-5 py-5 text-center">
        <img src={f.avatar} alt="" className="mx-auto h-20 w-20 rounded-full" />
        <h1 className="mt-3 text-xl font-extrabold">{f.name}</h1>
        <p className="text-sm text-slate-500">@{f.handle}</p>
        <p className="mt-2 text-sm text-slate-600">{f.bio}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 py-3">
            <div className="text-xl font-bold">{f.sent}</div>
            <div className="text-xs text-slate-500">Articles Shared</div>
          </div>
          <div className="rounded-2xl bg-slate-50 py-3">
            <div className="text-xl font-bold">{f.read}</div>
            <div className="text-xs text-slate-500">Articles Completed</div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          {SEED_CONTENT.slice(0, 4).map((c) => (
            <div key={c.id} className="overflow-hidden rounded-2xl border">
              <img src={c.image} alt="" className="h-20 w-full object-cover" />
              <div className="p-2 text-xs font-bold">{c.title}</div>
            </div>
          ))}
        </div>
        <Link href={`/app/invite?content=c3`} className="btn-primary mt-6">
          Meet Me on the Bridge
        </Link>
      </div>
    </div>
  );
}
