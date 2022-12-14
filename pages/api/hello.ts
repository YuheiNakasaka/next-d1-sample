import type { NextRequest } from "next/server";
import type { Database } from "@cloudflare/d1";

export const config = {
  runtime: "experimental-edge",
};

export interface Env {
  DB: Database;
}

type CfNextRequest = NextRequest & { env: any };

export default async function (req: CfNextRequest) {
  return new Response(
    JSON.stringify({
      req: JSON.stringify(req),
      env: JSON.stringify(req.env),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
