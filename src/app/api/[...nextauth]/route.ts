import { handlers } from "@/server/auth";

export const runtime = "nodejs";  // change from "edge" to "nodejs"

export const { GET, POST } = handlers;