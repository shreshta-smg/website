import { Database } from "./database.types";

export enum FeedbackCategory {
  None = 0,
  Therapy = 1,
  Consultation = 2,
  Training = 3,
  Coaching = 4,
  Workshop = 5,
  Other = 6,
}

export enum FeedbackType {
  Review = 1,
  Inquiry = 2,
}

export const services = [
  "None",
  "Therapy",
  "Consultation",
  "Training",
  "Coaching",
  "Workshops",
  "Other",
];

export type Testimonial = {
  name: string;
  role: string;
  content?: string;
  avatar: string;
  rating: number;
  email: string;
  phone: string;
};

export interface PaginatedData<T> {
  data: T[] | null;
  totalCount: number;
  error: Error | null;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  categoryId?: string;
}

export type Category = Database["api"]["Tables"]["categories"]["Row"];
export type Article = Database["api"]["Tables"]["articles"]["Row"];
export type Feedback = Database["api"]["Tables"]["feedbacks"]["Row"];
