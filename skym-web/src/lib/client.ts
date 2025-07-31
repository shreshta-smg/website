import { createBrowserClient } from "@supabase/ssr";
import { Feedback } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!, {
    db: {
      schema: "api",
    },
  });

export async function getReviews(): Promise<Feedback[]> {
  try {
    const { data, error } = await createClient()
      .from("feedbacks") // Your table name here
      .select(`title, rating, comment, full_name, profession`) // Request exact count
      .order("created_at", { ascending: false })
      .eq("feedback_type", 1)
      .is("is_approved", true)
      .limit(3);

    if (error) {
      console.error("Supabase error fetching reviews:", error.message);
      throw new Error(error.message);
    }

    return data as Feedback[];
  } catch (err) {
    console.error("Unexpected error fetching reviews:", err.message);
    throw new Error("An unexpected error occurred.");
  }
}

export async function newReview(feedback: Feedback) {
  try {
    feedback.feedback_type = 1;
    feedback.is_approved = false;
    const { error } = await createClient()
      .from("feedbacks") // Your table name here
      .insert(feedback);

    if (error) {
      console.error("Error submitting review:", error.message);
      throw new Error(error.message);
    }

    return {
      status: 201,
      created_at: new Date(),
      message: "Review submitted successfully",
    };
  } catch (err) {
    console.error("Unexpected error submitting review:", err.message);
    throw new Error("An unexpected error occurred.");
  }
}

export async function newContactUsInquiry(feedback: Feedback) {
  try {
    const { error } = await createClient()
      .from("feedbacks") // Your table name here
      .insert(feedback);

    if (error) {
      console.error("Error submitting inquiry:", error.message);
      throw new Error(error.message);
    }

    return {
      status: 201,
      created_at: new Date(),
      message: "Inquiry submitted successfully",
    };
  } catch (err) {
    console.error("Unexpected error submitting inquiry:", err.message);
    throw new Error("An unexpected error occurred.");
  }
}
