/* eslint-disable next-on-pages/no-nodejs-runtime */
import { handlers } from "@/server/auth";

export const runtime = "nodejs";

export const { GET, POST } = handlers;