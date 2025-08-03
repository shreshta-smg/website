// app/api/get-page-views/route.ts
import { createClient } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

// Define a GET handler for your API route
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pagePath = searchParams.get("pagePath");

  if (!pagePath) {
    return NextResponse.json(
      { message: "Missing pagePath query parameter" },
      {
        status: 400,
      },
    );
  }

  try {
    const { data, error } = await supabase
      .from("page_visits")
      .select("unique_visitors_count")
      .eq("page_path", pagePath)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 means "No rows found"
      console.error("Error fetching page views:", error);
      throw new Error("Failed to fetch page views");
    }

    const count = data ? data.unique_visitors_count : 0;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch page views:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
          details: error.message,
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
