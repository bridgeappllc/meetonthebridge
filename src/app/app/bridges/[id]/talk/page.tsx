"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { TopBar } from "@/components/ui";
import { friendById, useStore } from "@/lib/store";

export default function Talk() {
  const { id } = useParams<{ id: string }>();
  const { bridges, friends } = useStore();
  const bridge = bridges.find((b) => b.id === id);
  const friend = bridge ? friendById(bridge.friendId, friends) : undefined;
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState(
    friend
      ? [
          {
            from: "them" as const,
            text: `Thanks for inviting me. We already share ${bridge?.progress ?? 10} agreements. What should we look at first?`,
          },
        ]
      : []
  );

  return (
    <div className="flex min-h-[70dvh] flex-col">
      <TopBar title={friend?.name || "Discussion"} back={`/app/bridges/${id}/built`} />
      <div className="flex-1 space-y-3 px-4 py-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
              m.from === "me"
                ? "ml-auto bg-[#2b6cff] text-white"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-slate-200 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setMsgs((m) => [...m, { from: "me", text }]);
          setText("");
        }}
      >
        <input
          className="field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your thought..."
        />
        <button className="rounded-full bg-[#2b6cff] px-4 text-sm font-semibold text-white">
          Send
        </button>
      </form>
    </div>
  );
}
