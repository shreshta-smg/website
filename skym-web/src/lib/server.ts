import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Article, Category, PaginatedData, PaginationOptions } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const createClient = () => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    db: {
      schema: "api",
    },
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value;
      },
      async set(name: string, value: string, options: CookieOptions) {
        const cookieStore = await cookies();
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // This can happen in a Server Component that doesn't set cookies (e.g., just reads)
          console.warn("Could not set cookie from server component:", error);
        }
      },
      async remove(name: string, options: CookieOptions) {
        const cookieStore = await cookies();
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          console.warn("Could not remove cookie from server component:", error);
        }
      },
    },
  });
};

const supabase = createClient();
export async function getPaginatedCategories(
  options: PaginationOptions,
): Promise<PaginatedData<Category>> {
  const { page, pageSize, sortBy = "created_at", sortOrder = "desc" } = options;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .from("categories") // Your table name here
      .select(`title, slug`, { count: "exact" }) // Request exact count
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(startIndex, endIndex);

    if (error) {
      console.error("Supabase error fetching categories:", error.message);
      return { data: null, totalCount: 0, error: new Error(error.message) };
    }

    return { data: data as Category[], totalCount: count || 0, error: null };
  } catch (err) {
    console.error("Unexpected error fetching categories:", err.message);
    return {
      data: null,
      totalCount: 0,
      error: new Error("An unexpected error occurred."),
    };
  }
}

export async function getPaginatedArticles(
  options: PaginationOptions,
): Promise<PaginatedData<Article>> {
  const {
    page,
    pageSize,
    sortBy = "created_at",
    sortOrder = "desc",
    categoryId, // <--- NEW: Destructure categoryId
  } = options;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  try {
    const foundCategory = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.categoryId)
      .maybeSingle();
    if (!foundCategory.data || foundCategory.error) {
      console.error("Error fetching category with Reference: ", categoryId);
      return {
        data: null,
        totalCount: 0,
        error: new Error(foundCategory.error?.message),
      };
    }

    const categoryRef: number | null = foundCategory.data.id;
    const articles = await supabase
      .from("articles") // Your table name here
      .select(
        "article_id, caption, category_id, content, created_at, featured_image_url, id, title",
        { count: "exact" },
      )
      .eq("category_id", categoryRef)
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(startIndex, endIndex);

    const { data, error, count } = articles;

    if (error) {
      console.error("Supabase error fetching articles:", error.message);
      return { data: null, totalCount: 0, error: new Error(error.message) };
    }

    return { data: data as Article[], totalCount: count || 0, error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching articles:", err.message);
    } else {
      console.error("Unexpected error fetching articles:", err);
    }
    return {
      data: null,
      totalCount: 0,
      error: new Error("An unexpected error occurred."),
    };
  }
}

export async function getArticleByArticleId(articleId: string) {
  try {
    const article = await supabase
      .from("articles")
      .select(
        `article_id, caption, content, created_at, featured_image_url, title, articles_tags(tags(title, slug))`,
      )
      .eq("article_id", articleId)
      .maybeSingle();

    if (!article.data || article.error) {
      console.error("Error fetching article with ID:", articleId);
      return { data: null, error: new Error(article.error?.message) };
    }

    return { data: article.data, error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Unexpected error fetching article:", err.message);
    } else {
      console.error("Unexpected error fetching article:", err);
    }
    return { data: null, error: new Error("An unexpected error occurred.") };
  }
}
