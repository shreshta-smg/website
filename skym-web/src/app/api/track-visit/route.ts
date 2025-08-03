// app/api/track-visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  db: {
    schema: "api",
  },
});

export async function POST(request: NextRequest) {
  const { visitorId, pagePath } = await request.json();

  if (!visitorId || !pagePath) {
    return NextResponse.json(
      { message: "Missing visitorId or pagePath" },
      { status: 400 },
    );
  }

  try {
    // CORRECTED LINE: Call the RPC function directly on the supabase client
    const { data: newCount, error: rpcError } = await supabase.rpc(
      "increment_page_visit_count",
      {
        p_page_path: pagePath, // This argument name must match the parameter name in your SQL function
      },
    );

    if (rpcError) {
      console.error("Error calling increment_page_visit_count RPC:", rpcError);
      throw new Error(
        rpcError.message || "Failed to update page visit count via RPC",
      );
    }

    // The RPC function should return the new unique_visitors_count directly
    return NextResponse.json(
      { message: "Visit counted", count: newCount },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to track visit:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
