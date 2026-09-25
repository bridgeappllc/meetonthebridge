export type Topic =
  | "Politics"
  | "Economics"
  | "Culture"
  | "Education"
  | "Religion"
  | "Science";

export type Presence = "Active" | "Away" | "Offline";

export type ContentItem = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  category: Topic | "Environment" | "Economy" | "Global" | "Technology";
  tags: string[];
  image: string;
  url: string;
  note?: string;
  communityRating: number;
};

export type Friend = {
  id: string;
  name: string;
  handle: string;
  presence: Presence;
  avatar: string;
  bio: string;
  sent: number;
  read: number;
};

export type Perception = "propaganda" | "neutral" | "redpilled" | null;

export type BridgeStatus = "pending" | "active" | "built";

export type Bridge = {
  id: string;
  friendId: string;
  contentId: string;
  status: BridgeStatus;
  agreements: boolean[];
  myAnswers: string[];
  perception: Perception;
  invitedAgo: string;
  lastActive: string;
  progress: number;
};

export type User = {
  name: string;
  handle: string;
  email: string;
  bio: string;
  topics: Topic[];
};
