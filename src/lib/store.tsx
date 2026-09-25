"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_AGREEMENTS, SEED_CONTENT, SEED_FRIENDS } from "./data";
import type {
  Bridge,
  ContentItem,
  Friend,
  Perception,
  Topic,
  User,
} from "./types";

const KEY = "bridge-mvp-v1";

type State = {
  user: User | null;
  library: ContentItem[];
  friends: Friend[];
  bridges: Bridge[];
  ready: boolean;
};

type Actions = {
  signup: (user: User) => void;
  logout: () => void;
  setTopics: (topics: Topic[]) => void;
  addToLibrary: (item: ContentItem) => void;
  createInvite: (friendIds: string[], contentId: string, note: string) => string;
  acceptBridge: (id: string) => void;
  declineBridge: (id: string) => void;
  setPerception: (bridgeId: string, p: Perception) => void;
  setAnswers: (bridgeId: string, answers: string[]) => void;
  toggleAgreement: (bridgeId: string, index: number) => void;
};

const Ctx = createContext<(State & Actions) | null>(null);

const empty: Omit<State, "ready"> = {
  user: null,
  library: SEED_CONTENT.slice(0, 4),
  friends: SEED_FRIENDS,
  bridges: [
    {
      id: "b-pending",
      friendId: "f1",
      contentId: "c3",
      status: "pending",
      agreements: Array(DEFAULT_AGREEMENTS.length).fill(false),
      myAnswers: ["", "", ""],
      perception: null,
      invitedAgo: "1d ago",
      lastActive: "1d ago",
      progress: 0,
    },
    {
      id: "b-active",
      friendId: "f2",
      contentId: "c1",
      status: "active",
      agreements: [true, true, true, false, false, false, false, false, false, false, false, false],
      myAnswers: [
        "The section on trust stuck with me.",
        "I agreed that polarization is getting worse.",
        "We need slower conversations.",
      ],
      perception: "neutral",
      invitedAgo: "3d ago",
      lastActive: "3h ago",
      progress: 3,
    },
  ],
};

function load(): Omit<State, "ready"> {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ ...empty, ready: false });

  useEffect(() => {
    setState({ ...load(), ready: true });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    const { ready: _r, ...rest } = state;
    localStorage.setItem(KEY, JSON.stringify(rest));
  }, [state]);

  const actions: Actions = useMemo(
    () => ({
      signup: (user) => setState((s) => ({ ...s, user })),
      logout: () => setState((s) => ({ ...s, user: null })),
      setTopics: (topics) =>
        setState((s) =>
          s.user ? { ...s, user: { ...s.user, topics } } : s
        ),
      addToLibrary: (item) =>
        setState((s) => ({ ...s, library: [item, ...s.library] })),
      createInvite: (friendIds, contentId, _note) => {
        const id = `b-${Date.now()}`;
        setState((s) => ({
          ...s,
          bridges: [
            ...friendIds.map((friendId, i) => ({
              id: i === 0 ? id : `${id}-${i}`,
              friendId,
              contentId,
              status: "pending" as const,
              agreements: Array(DEFAULT_AGREEMENTS.length).fill(false),
              myAnswers: ["", "", ""],
              perception: null,
              invitedAgo: "just now",
              lastActive: "just now",
              progress: 0,
            })),
            ...s.bridges,
          ],
        }));
        return id;
      },
      acceptBridge: (id) =>
        setState((s) => ({
          ...s,
          bridges: s.bridges.map((b) =>
            b.id === id ? { ...b, status: "active" } : b
          ),
        })),
      declineBridge: (id) =>
        setState((s) => ({
          ...s,
          bridges: s.bridges.filter((b) => b.id !== id),
        })),
      setPerception: (bridgeId, p) =>
        setState((s) => ({
          ...s,
          bridges: s.bridges.map((b) =>
            b.id === bridgeId ? { ...b, perception: p } : b
          ),
        })),
      setAnswers: (bridgeId, answers) =>
        setState((s) => ({
          ...s,
          bridges: s.bridges.map((b) =>
            b.id === bridgeId ? { ...b, myAnswers: answers } : b
          ),
        })),
      toggleAgreement: (bridgeId, index) =>
        setState((s) => ({
          ...s,
          bridges: s.bridges.map((b) => {
            if (b.id !== bridgeId) return b;
            const agreements = [...b.agreements];
            agreements[index] = !agreements[index];
            const progress = agreements.filter(Boolean).length;
            return {
              ...b,
              agreements,
              progress,
              status: progress >= 10 ? "built" : b.status === "pending" ? "pending" : "active",
            };
          }),
        })),
    }),
    []
  );

  return <Ctx.Provider value={{ ...state, ...actions }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}

export function contentById(id: string, library: ContentItem[]) {
  return library.find((c) => c.id === id) || SEED_CONTENT.find((c) => c.id === id);
}

export function friendById(id: string, friends: Friend[]) {
  return friends.find((f) => f.id === id);
}
