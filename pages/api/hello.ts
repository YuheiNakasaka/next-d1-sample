import type { NextRequest } from "next/server";
import type { Database } from "@cloudflare/d1";

export const config = {
  runtime: "experimental-edge",
};

export interface Env {
  DB: Database;
}

export default async function (req: NextRequest, env: Env) {
  return new Response(
    JSON.stringify({
      req: JSON.stringify(req),
      env: JSON.stringify(env),
      penv: JSON.stringify(process.env),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
