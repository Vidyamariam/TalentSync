export interface Host {
  clerkId: string;
  email: string;
  name: string;
  profileImage: string;
  _id: string;
}

export interface SessionData {
  _id: string; // The session's unique ID
  callId: string;
  problemTitle: string;
  difficulty: "easy" | "medium" | "hard"; // Using a union type for better safety
  status: "active" | "ended"; // Assuming these are the common states
  host: Host;
  participant: string | null; // Nullable if no one has joined yet
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number; // MongoDB version key
  isPrivate: boolean;
}
