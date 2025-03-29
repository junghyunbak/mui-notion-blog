import { type MetadataRoute } from "next";
import { isPageObjectResponse, notion } from "@/utils";
import { NOTION } from "@/constants";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const devLogSitemaps: MetadataRoute.Sitemap = (
    await notion.databases.query({
      database_id: NOTION.DEV_LOG_DATABASE.ID,
      filter: {
        and: [
          {
            property: NOTION.DEV_LOG_DATABASE.PROPERTY.CHECKBOX,
            checkbox: {
              equals: false,
            },
          },
        ],
      },
    })
  ).results
    .filter((result) => isPageObjectResponse(result))
    .map(({ id, last_edited_time }) => ({
      url: `https://junghyunbak.site/notion/${id}`,
      lastModified: new Date(last_edited_time),
      changeFrequency: "monthly",
      priority: 0.9,
    }));

  const snippetSitemaps: MetadataRoute.Sitemap = (
    await notion.databases.query({
      database_id: NOTION.SNIPPET_DATABASE.ID,
      filter: {
        and: [
          {
            property: NOTION.SNIPPET_DATABASE.PROPERTY.CHECKBOX,
            checkbox: {
              equals: false,
            },
          },
        ],
      },
    })
  ).results
    .filter((result) => isPageObjectResponse(result))
    .map(({ id, last_edited_time }) => ({
      url: `https://junghyunbak.site/notion/${id}`,
      lastModified: new Date(last_edited_time),
      changeFrequency: "monthly",
      priority: 0.9,
    }));

  return [...devLogSitemaps, ...snippetSitemaps];
}
