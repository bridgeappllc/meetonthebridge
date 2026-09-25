"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Phone, TopBar } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function Login() {
  const { signup, user } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) {
      signup({
        name: "You",
        handle: "you",
        email,
        bio: "Back on the Bridge.",
        topics: ["Politics", "Economics", "Science"],
      });
    }
    router.push("/app");
  }

  return (
    <Phone>
      <TopBar title="Welcome back" back="/" />
      <form onSubmit={onSubmit} className="space-y-4 px-5 py-6">
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            className="field mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </label>
        <button className="btn-primary mt-4" type="submit">
          Log in
        </button>
      </form>
    </Phone>
  );
}
