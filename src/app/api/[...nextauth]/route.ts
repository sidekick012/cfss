/* eslint-disable next-on-pages/no-nodejs-runtime */
import { handlers } from "@/server/auth";

export const runtime = "edge";

export const { GET, POST } = handlers;