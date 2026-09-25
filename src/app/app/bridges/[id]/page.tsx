"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/ui";
import { DEFAULT_AGREEMENTS } from "@/lib/data";
import { friendById, useStore } from "@/lib/store";

export default function BridgeDetail() {
  const { id } = useParams<{ id: string }>();
  const { bridges, friends, toggleAgreement } = useStore();
  const bridge = bridges.find((b) => b.id === id);
  const friend = bridge ? friendById(bridge.friendId, friends) : undefined;

  if (!bridge) {
    return <div className="p-6">Bridge not found.</div>;
  }

  return (
    <div>
      <TopBar title="10 things we can agree on" back="/app/bridges" />
      <div className="px-5 py-4">
        <div className="rounded-2xl bg-[#2b6cff] px-4 py-3 text-center text-sm font-semibold text-white">
          10 things we can agree on
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          With {friend?.name}. Check the ones you both mean.
        </p>
        <div className="mt-4 space-y-2">
          {DEFAULT_AGREEMENTS.map((line, i) => (
            <label
              key={line}
              className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm"
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4"
                checked={!!bridge.agreements[i]}
                onChange={() => toggleAgreement(bridge.id, i)}
              />
              <span>
                {i + 1}. {line}
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-[#eef3ff] p-3 text-xs text-slate-600">
          Both people should fill this out before you message and debate.
        </p>
        {bridge.progress >= 10 ? (
          <Link href={`/app/bridges/${bridge.id}/built`} className="btn-primary mt-5">
            See Bridge Built
          </Link>
        ) : (
          <p className="mt-5 text-center text-sm text-slate-500">
            {bridge.progress} / 10 selected
          </p>
        )}
      </div>
    </div>
  );
}
