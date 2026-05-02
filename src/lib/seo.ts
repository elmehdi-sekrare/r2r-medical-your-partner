export const SITE_URL = "https://r2rmedical.ma";
export const SITE_NAME = "R2R Medical";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero-medical-EX-Q5qg_.jpg`;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
}) {
  const url = absoluteUrl(path);

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:locale", content: "fr_MA" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

export function canonical(path = "/") {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}
