import { z, defineCollection, reference } from 'astro:content';

const meta = () =>
  z
    .object({
      title: z.string(),
      description: z.string(),

      canonical: z.string().url().optional(),

      noindex: z.boolean().optional(),
      nofollow: z.boolean().optional(),

      charset: z.string().optional(),

      image: z.object({
        src: z.string().optional(),
        alt: z.string().optional()
      }).optional(),

      languageAlternates: z.array(z.object({href: z.string(), hrefLang: z.string()})).optional(),

      og: z.boolean().optional(),
      tw: z.boolean().optional(),

      openGraph: z
        .object({
          basic: z.object({
            title: z.string().optional(),
            type: z.string().optional(),
            image: z.string().optional(),
            url: z.string().optional(),
          }).optional(),
           optional: z.object({
            audio: z.string().optional(),
            description: z.string().optional(),
            determiner: z.string().optional(),
            locale: z.string().optional(),
            localeAlternate: z.array(z.string()).optional(),
            siteName: z.string().optional(),
            video: z.string().optional()
          }).optional(),
          image: z.object({
            url: z.string().optional(),
            secureUrl: z.string().optional(),
            type: z.string().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            alt: z.string().optional(),
          }).optional(),
           article: z.object({
            publishedTime: z.string().optional(),
            modifiedTime: z.string().optional(),
            expirationTime: z.string().optional(),
            authors: z.array(z.string()).optional(),
            section: z.string().optional(),
            tags: z.array(z.string()).optional(),
          }).optional(),
        })
        .optional(),

      twitter: z
        .object({
          card: z.enum(['summary', 'summary_large_image', 'app', 'player']).optional(),
          site: z.string().optional(),
          creator: z.string().optional(),
          title: z.string().optional(),
          image: z.string().optional(),
          imageAlt: z.string().optional(),
          description: z.string().optional(),
        })
        .optional(),
    })

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    meta: meta(),
    // focusKeyword
    // otherKeywords
    title: z.string(),
    subheading: z.string(),
    leading: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    //categories: z.array(z.string()).default(['brak kategorii']),
    categories: z.array(z.enum(['brak kategorii', 'strona-www', 'cyfryzacja', 'automatyzacja'])).default(['brak kategorii']),
    // tags: z.array(z.string()).optional(),
    relatedPosts: z.array(reference('blog')).max(3).optional(),
    date: z.coerce.date(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});


export const collections = {
  'blog': blogCollection,
};