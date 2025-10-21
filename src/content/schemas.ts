import { z, reference } from "astro:content"

export const BLOG_CATEGORIES = [
"brak kategorii", "biznes", "www", "cyfryzacja", "automatyzacja", "wskazówki"
] as const;

export const PORTFOLIO_CATEGORIES = [
"www", "system", "automatyzacja"
] as const;

export const REVIEW_SOURCES = [
'Google', 'Facebook', 'Gowork', 'TrustMate', 'Inne'
]as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[number];
export type ReviewSource = typeof REVIEW_SOURCES[number];


export const metaSchema = z.object({
  title: z.string().max(60, "Tytuł SEO powinien mieć max 60 znaków"),
  description: z.string().max(160, "Opis SEO powinien mieć max 160 znaków"),
  canonical: z.string().url().optional(),
  noindex: z.boolean().optional().default(false),
  nofollow: z.boolean().optional().default(false),
})

// export const metaSchema = 
//   z.object({
//     title: z.string().max(50),
//     description: z.string().max(130),

//     canonical: z.string().url().optional(),

//     noindex: z.boolean().optional(),
//     nofollow: z.boolean().optional(),

//     charset: z.string().optional(),

//     image: z
//       .object({
//         src: z.string().optional(),
//         alt: z.string().optional(),
//       })
//       .optional(),

//     languageAlternates: z
//       .array(z.object({ href: z.string(), hrefLang: z.string() }))
//       .optional(),

//     og: z.boolean().optional(),
//     tw: z.boolean().optional(),

//     openGraph: z
//       .object({
//         basic: z
//           .object({
//             title: z.string().optional(),
//             type: z.string().optional(),
//             image: z.string().optional(),
//             url: z.string().optional(),
//           })
//           .optional(),
//         optional: z
//           .object({
//             audio: z.string().optional(),
//             description: z.string().optional(),
//             determiner: z.string().optional(),
//             locale: z.string().optional(),
//             localeAlternate: z.array(z.string()).optional(),
//             siteName: z.string().optional(),
//             video: z.string().optional(),
//           })
//           .optional(),
//         image: z
//           .object({
//             url: z.string().optional(),
//             secureUrl: z.string().optional(),
//             type: z.string().optional(),
//             width: z.number().optional(),
//             height: z.number().optional(),
//             alt: z.string().optional(),
//           })
//           .optional(),
//         article: z
//           .object({
//             publishedTime: z.string().optional(),
//             modifiedTime: z.string().optional(),
//             expirationTime: z.string().optional(),
//             authors: z.array(z.string()).optional(),
//             section: z.string().optional(),
//             tags: z.array(z.string()).optional(),
//           })
//           .optional(),
//       })
//       .optional(),

//     twitter: z
//       .object({
//         card: z
//           .enum(["summary", "summary_large_image", "app", "player"])
//           .optional(),
//         site: z.string().optional(),
//         creator: z.string().optional(),
//         title: z.string().optional(),
//         image: z.string().optional(),
//         imageAlt: z.string().optional(),
//         description: z.string().optional(),
//       })
//       .optional(),
//   })

export const blogSchema = z.object({
    meta: metaSchema,
    // focusKeyword
    // otherKeywords
    heading: z.string(),
    subheading: z.string(),
    leading: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    video: z.string().optional(),
    //categories: z.array(z.string()).default(['brak kategorii']),
    categories: z
      .array(
        z.enum(BLOG_CATEGORIES)
      )
      .default([BLOG_CATEGORIES[0]]),
    relatedPosts: z.array(reference("blog")).max(2).optional(),
    date: z.coerce.date(),
    //author: z.string().optional(),
    draft: z.boolean().optional(),
  })


  export const portfolioSchema = z.object({
    order: z.number(),
    meta: metaSchema,

    title: z.string(),  
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),

    problem: z.string(),
    target: z.string(),
    result: z.string(),

     webMetrics: z.object({
      speed: z.number().optional(),
      accessibility: z.number().optional(),
      technics: z.number().optional(),
      seo: z.number().optional(),
      views: z.number().optional(),
      clicks: z.number().optional(),
    }).optional(),


    link: z.string().url().optional(),

    gallery: z.array(z.object({src: z.string(),
      alt: z.string(),})).max(10).optional(),
     videos: z.array(z.string()).optional(),

    category: z.enum(PORTFOLIO_CATEGORIES),
    review: reference("reviews").optional(),

    relatedProjects: z.array(reference("portfolio")).max(2).optional(),

    draft: z.boolean().optional(),
  })

  export const reviewSchema = z.object({

    clientName: z.string().min(1, { message: "Nazwa klienta jest wymagana." }),
    
    clientImage: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    
    rating: z.number().min(1).max(5).default(5),
    
    source: z.enum(REVIEW_SOURCES).default('Inne'),
    
    reviewLink: z.string().url().nullish(),

    service: z.array(z.enum(PORTFOLIO_CATEGORIES)).min(1),
    
    date: z.coerce.date(),

    draft: z.boolean().default(false),
});

export const pricingSchema = z.array(
  z.object({
  title: z.string().min(1, { message: "Tytuł jest wymagany." }),
  description: z.string(),
  price: z.number().min(0, { message: "Cena musi być liczbą nieujemną." }),
  unit: z.enum(['godzina', 'projekt', 'miesiąc', 'usługa']).default('usługa'),
  isPopular: z.boolean().default(false)})
)
