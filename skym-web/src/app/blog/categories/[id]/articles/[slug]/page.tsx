import ArticlePreview from "@/components/ui/ArticlePreview";
import { getArticleByArticleId } from "@/lib/server";
interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function ArticlePage(props: Props) {
  const params = await props.params;
  const articleId = params.slug;
  const { data, error } = await getArticleByArticleId(articleId);
  const categoryId = params.id;
  const tags = data?.articles_tags?.flatMap((tag) => tag.tags);
  return (
    <section className="p-6">
      <ArticlePreview
        title={data?.title}
        content={data?.content}
        categoryId={categoryId}
        featured_image_url={data?.featured_image_url}
        caption={data?.caption}
        key={data?.article_id}
        tags={tags}
        slug={data?.article_id}
      />
    </section>
  );
}
