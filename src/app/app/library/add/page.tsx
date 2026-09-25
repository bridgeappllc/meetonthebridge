"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Phone, TopBar } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Topic } from "@/lib/types";

const CATS: Topic[] = [
  "Politics",
  "Economics",
  "Culture",
  "Education",
  "Religion",
  "Science",
];

export default function AddLibrary() {
  const { addToLibrary } = useStore();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<Topic>("Politics");
  const [note, setNote] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const host = url.replace(/^https?:\/\//, "").split("/")[0] || "shared link";
    addToLibrary({
      id: `c-${Date.now()}`,
      title: host,
      subtitle: note || "Added from a URL",
      author: "You",
      readTime: "link",
      category,
      tags: [category],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      url,
      note,
      communityRating: 0,
    });
    router.push("/app/profile");
  }

  return (
    <Phone>
      <TopBar title="Add to Library" back="/app" />
      <form onSubmit={onSubmit} className="space-y-5 px-5 py-6">
        <label className="block text-sm font-medium text-slate-500">
          Article or Video URL
          <input
            className="field mt-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste an article or video URL"
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-500">
          Category
          <select
            className="field mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value as Topic)}
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-500">
          Personal Note
          <textarea
            className="field mt-1 min-h-28"
            maxLength={300}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Why does this matter to you? (optional)"
          />
          <div className="mt-1 text-right text-xs text-slate-400">
            {note.length} / 300
          </div>
        </label>
        <button className="btn-primary" type="submit">
          Add to Library
        </button>
        <button
          type="button"
          className="w-full py-2 text-sm font-medium text-[#2b6cff]"
          onClick={() => router.push("/app")}
        >
          Skip for now
        </button>
      </form>
    </Phone>
  );
}
