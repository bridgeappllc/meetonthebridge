"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Phone } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Topic } from "@/lib/types";

const TOPICS: { id: Topic; icon: string }[] = [
  { id: "Politics", icon: "🏛" },
  { id: "Economics", icon: "📈" },
  { id: "Culture", icon: "🎭" },
  { id: "Education", icon: "🎓" },
  { id: "Religion", icon: "🕊" },
  { id: "Science", icon: "🔬" },
];

export default function Onboarding() {
  const { setTopics } = useStore();
  const router = useRouter();
  const [picked, setPicked] = useState<Topic[]>(["Politics", "Economics", "Science"]);

  function toggle(t: Topic) {
    setPicked((p) =>
      p.includes(t) ? p.filter((x) => x !== t) : [...p, t]
    );
  }

  return (
    <Phone>
      <div className="px-6 pb-8 pt-10">
        <h1 className="text-center text-[26px] font-extrabold">
          What topics matter to you?
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Select at least 3 topics to personalize your experience.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {TOPICS.map((t) => {
            const on = picked.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggle(t.id)}
                className={`rounded-2xl border-2 p-5 text-center ${
                  on
                    ? "border-[#2b6cff] bg-[#f3f7ff]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="text-3xl">{t.icon}</div>
                <div className="mt-2 font-semibold">{t.id}</div>
              </button>
            );
          })}
        </div>
        <button
          className="btn-primary mt-8"
          disabled={picked.length < 3}
          onClick={() => {
            setTopics(picked);
            router.push("/app");
          }}
        >
          Continue
        </button>
        <button
          className="mt-3 w-full py-2 text-sm font-medium text-[#2b6cff]"
          onClick={() => router.push("/app")}
        >
          Skip for now
        </button>
      </div>
    </Phone>
  );
}
