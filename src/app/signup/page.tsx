"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Phone, TopBar } from "../../components/ui";
import { useStore } from "../../lib/store";

export default function Signup() {
  const { signup } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const handle =
      name.trim().toLowerCase().replace(/\s+/g, "") || "member";
    signup({
      name: name || "You",
      handle,
      email,
      bio: "Curious mind. Reading widely across perspectives.",
      topics: [],
    });
    router.push("/onboarding");
  }

  return (
    <Phone>
      <TopBar title="Create account" back="/" />
      <form onSubmit={onSubmit} className="space-y-4 px-5 py-6">
        <p className="text-sm text-slate-500">
          This first version saves your session on this device. Real accounts
          come next.
        </p>
        <label className="block text-sm font-medium">
          Name
          <input
            className="field mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Chen"
            required
          />
        </label>
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
          Continue
        </button>
      </form>
    </Phone>
  );
}
