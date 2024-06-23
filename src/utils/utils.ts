import type { Heading } from '@components/blog/TocHeading.astro'

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}


export function buildToc(headings: Heading[]): Heading[] {
  const toc: Heading[] = []
  const parentHeadings = new Map()

  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] }
    parentHeadings.set(heading.depth, heading)

    if (heading.depth === 2) {
      toc.push(heading)
    } else {
      const parent = parentHeadings.get(heading.depth - 1)
      if (parent) parent.subheadings.push(heading)
    }
  })
  return toc
}
