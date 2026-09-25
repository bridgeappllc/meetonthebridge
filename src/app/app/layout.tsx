"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Phone, TabBar } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  if (!ready) {
    return (
      <Phone>
        <div className="flex min-h-[100dvh] items-center justify-center text-slate-400">
          Loading…
        </div>
      </Phone>
    );
  }

  return (
    <Phone>
      <div className="flex min-h-[100dvh] flex-col">
        <div className="flex-1">{children}</div>
        <TabBar />
      </div>
    </Phone>
  );
}
