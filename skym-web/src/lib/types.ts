export type BaseError = {
  name: string;
  message: string;
  status: number;
  details: object;
};
export type GenericError = {
  data: null;
  error: BaseError;
};

export type BasePagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type BaseMeta = {
  pagination: BasePagination;
};

export type AboutUsData = {
  title: string;
  our_story: string;
  vision_statement: string;
  founder_name: string;
  address_line: string;
  contact_email: string;
  contact_number: string;
};

export type AboutUs = {
  data: AboutUsData;
  meta: BaseMeta;
};

export type Tag = {
  id: string;
  title: string;
  slug: string;
};

export type Category = {
  id: string;
  title: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featured_image_url?: string;
  caption?: string;
  tags: string[];
  categoryTitle?: string;
  categoryId?: string;
};

export type ReviewCategory =
  | "Therapy"
  | "Consultation"
  | "Training"
  | "Coaching"
  | "Workshop"
  | "Other";

export type ContactUsCategory =
  | "Therapy"
  | "Consultation"
  | "Training"
  | "Coaching"
  | "Workshop"
  | "Other";

export type Review = {
  id?: string;
  title?: string;
  category?: ReviewCategory;
  rating?: number;
  comment?: string;
  reviewer_name: string;
  reviewer_email: string;
  reviewer_phone: string;
  profession?: string;
};

export type ContactUsInquiry = {
  id?: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  category: ContactUsCategory;
  subject?: string;
  message?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  content?: string;
  avatar: string;
  rating: number;
  email: string;
  phone: string;
};
