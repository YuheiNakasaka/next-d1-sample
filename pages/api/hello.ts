import type { NextRequest } from "next/server";
import type { Database } from "@cloudflare/d1";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: Database;
    }
  }
}

export const config = {
  runtime: "experimental-edge",
};

export interface Env {
  DB: Database;
}

type CfNextRequest = NextRequest & { env: any };

export default async function (req: CfNextRequest) {
  try {
    const { results } = await process.env.DB.prepare(
      "SELECT * FROM Customers WHERE CompanyName = ?"
    )
      .bind("Bs Beverages")
      .all();
    return new Response(
      JSON.stringify({
        req: JSON.stringify(req),
        results: JSON.stringify(results),
        processEnv: JSON.stringify(process.env),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        req: JSON.stringify(req),
        processEnv: JSON.stringify(process.env),
        error: e.message,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
