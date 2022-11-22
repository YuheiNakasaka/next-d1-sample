import type { NextRequest } from "next/server";
import type { Database } from "@cloudflare/d1";

export const config = {
  runtime: "experimental-edge",
};

export interface Env {
  DB: Database;
}

export default async function (req: NextRequest, env: Env) {
  const db = await env.DB;
  return new Response(
    JSON.stringify({
      req: JSON.stringify(req),
      env: JSON.stringify(env),
      db: JSON.stringify(db),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
