import {
  HTTPError,
  HTTPForbiddenError,
  HTTPNotFoundError,
  strapi,
} from "@strapi/client";
import {
  AboutUsData,
  Article,
  Category,
  ContactUsInquiry,
  Review,
  Tag,
  Testimonial,
} from "./types";

const client = strapi({
  baseURL: "http://localhost:1337/api",
});

const getSingular = async (singleType: string) => {
  try {
    const response = await client.single(singleType).find();
    return response.data;
  } catch (err) {
    if (err instanceof HTTPNotFoundError)
      console.error(`${singleType} not found`);
    else if (err instanceof HTTPError)
      console.error(`HTTP error: ${err.response.status}`);
    else console.error("Unexpected error:", err);
  }
};
const getCollection = async (
  collType: string,
  options?: Record<string, unknown>,
) => {
  try {
    const response = await client.collection(collType).find(options);
    return response;
  } catch (err) {
    if (err instanceof HTTPNotFoundError)
      console.error(`${collType} not found`);
    else if (err instanceof HTTPForbiddenError) console.error("Access denied");
    else if (err instanceof HTTPError)
      console.error(`HTTP error: ${err.response.status}`);
    else console.error("Unexpected error:", err);
  }
};

export const getReviews = async () => {
  try {
    const response = await getCollection("reviews");
    const reviews = response?.data;
    const pagination = response?.meta.pagination;
    return { reviews, pagination };
  } catch (err) {
    throw err;
  }
};

export const newReview = async (review: Review) => {
  try {
    const { data } = await client.collection("reviews").create(review);
    return {
      status: 201,
      message: "Successfully Submitted Review",
      createdAt: data.createdAt,
    };
  } catch (err) {
    throw err;
  }
};

export const newContactUsInquiry = async (
  contactUsInquiry: ContactUsInquiry,
) => {
  try {
    const { data } = await client
      .collection("contact-us-inquiries")
      .create(contactUsInquiry);
    return {
      status: 201,
      message: "Successfully Submitted Inquiry",
      createdAt: data.createdAt,
    };
  } catch (err) {
    throw err;
  }
};

export const getAboutUs = async () => {
  const aboutUsData = await getSingular("about-us");
  if (aboutUsData === undefined) {
    throw new Error("No AboutUs Found");
  }
  const aboutUs: AboutUsData = {
    title: aboutUsData.title,
    our_story: aboutUsData.our_story,
    vision_statement: aboutUsData.vision_statement,
    contact_email: aboutUsData.contact_email,
    contact_number: aboutUsData.contact_phone,
    founder_name: aboutUsData.founder_name,
    address_line: aboutUsData.address_line,
  };
  return aboutUs;
};

export const getCategories = async (page: number = 1) => {
  const options = {
    pagination: {
      pageSize: 5,
      page: page,
    },
  };
  const categoriesData = await getCollection("categories", options);
  if (categoriesData === undefined) {
    throw new Error("No categories found");
  }

  if (categoriesData.data === undefined || categoriesData.data.length === 0) {
    throw new Error("Categories data is not found");
  }
  const categories: Category[] = categoriesData.data.map((category) => ({
    id: category.documentId,
    title: category.title,
    slug: category.slug,
  }));
  return {
    categories: categories,
    pagination: categoriesData.meta.pagination,
  };
};

export const getArticles = async (categoryId: string, page: number = 1) => {
  const options = {
    populate: { tags: true, category: true },
    pagination: {
      pageSize: 5,
      page: page,
    },
    filters: {
      category: {
        documentId: { $eq: categoryId },
      },
    },
  };
  const articlesData = await getCollection("articles", options);
  if (articlesData === undefined) {
    throw new Error(`No articles found for ${categoryId}`);
  }
  const articles: Article[] = articlesData.data.map((article) => ({
    id: article.documentId,
    title: article.title,
    slug: article.slug,
    content: article.content,
    tags: article.tags.map((tag: Tag) => tag.title),
    categoryTitle: article.category.title,
    categoryId: categoryId,
  }));

  return {
    articles: articles,
    pagination: articlesData.meta.pagination,
    categoryId: categoryId,
  };
};

export const getArticleByArticleId = async (articleId: string) => {
  const options = {
    populate: {
      tags: true,
      category: true,
      featured_image: {
        fields: ["caption", "url"],
      },
    },
    filters: {
      slug: { $eq: articleId },
    },
  };
  const articlesData = await getCollection("articles", options);
  if (articlesData === undefined) {
    throw new Error(`No article found for ${articleId}`);
  }
  const articles: Article[] = articlesData.data.map((article) => ({
    id: article.documentId,
    title: article.title,
    slug: article.slug,
    content: article.content,
    featured_image_url: article.featured_image?.url,
    caption: article.featured_image?.caption,
    tags: article.tags.map((tag: Tag) => tag.title),
    categoryTitle: article.category.title,
  }));

  return articles[0];
};
