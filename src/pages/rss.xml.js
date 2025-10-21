import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET(context) {
  // 1. Pobierz wszystkie posty z kolekcji 'blog'
  const blogPosts = await getCollection("blog");

  // 2. Odfiltruj posty robocze (drafts) i posortuj od najnowszego do najstarszego
  const publishedPosts = blogPosts
    .filter((post) => post.data.draft !== true) // Zakładając, że masz pole 'draft' w frontmatter
    .sort(
      (a, b) =>
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );

  return rss({
    // === Informacje o kanale ===
    title: "Łukasz Miłoś - Blog",
    description:
      "Najciekawsze artykuły o web developmencie, programowaniu i technologii.",
    site: context.site,

    // === Lista elementów (postów) ===
    items: publishedPosts.map((post) => ({
      // --- Podstawowe dane ---
      title: post.data.heading,
      description: post.data.leading,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,

      content: sanitizeHtml(
        `<h1>${post.data.heading}</h1><p><em>${post.data.leading}</em></p>` +
          parser.render(post.body),
        {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }
      ),
    })),
  });
}
