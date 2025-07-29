import ArticlePreview from "@/components/ui/ArticlePreview";
import { getArticleByArticleId } from "@/lib/external";
interface Props {
  params: {
    id: string;
    slug: string;
  };
}

export default async function ArticlePage({ params }: Props) {
  const articleId = params.slug;
  const singleArticle = await getArticleByArticleId(articleId);
  const categoryId = params.id;
  return (
    <section className="p-6">
      <ArticlePreview
        title={singleArticle.title}
        content={singleArticle.content!}
        categoryId={categoryId}
        featured_image_url={singleArticle.featured_image_url}
        caption={singleArticle.caption!}
        key={singleArticle.id}
        tags={singleArticle.tags}
        slug={singleArticle.slug}
      />
    </section>
  );
}
