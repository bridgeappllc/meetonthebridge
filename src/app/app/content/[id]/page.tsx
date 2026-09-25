"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { TopBar } from "@/components/ui";
import { DISCUSSION_QUESTIONS } from "@/lib/data";
import { contentById, useStore } from "@/lib/store";

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const { library } = useStore();
  const item = contentById(id, library);
  const [value, setValue] = useState(50);

  if (!item) return <div className="p-6">Not found.</div>;

  const label =
    value < 33 ? "Propaganda" : value > 66 ? "Redpilled" : "Neutral";

  return (
    <div>
      <TopBar title="Article details" back="/app" />
      <img src={item.image} alt="" className="h-40 w-full object-cover" />
      <div className="px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2b6cff]">
          {item.category}
        </p>
        <h1 className="mt-1 text-xl font-extrabold leading-tight">{item.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
        <p className="mt-1 text-xs text-slate-400">
          By {item.author} · {item.readTime}
        </p>

        <h2 className="mt-6 font-bold">How do you perceive this article?</h2>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mt-4 w-full"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>Propaganda</span>
          <span>Neutral</span>
          <span>Redpilled</span>
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-[#2b6cff]">
          {label}
        </p>

        <h2 className="mt-6 font-bold">Discussion Questions</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm text-slate-700">
          {DISCUSSION_QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>

        <Link
          href={`/app/invite?content=${item.id}`}
          className="btn-primary mt-8"
        >
          Invite to the Bridge
        </Link>
      </div>
    </div>
  );
}
