import { NOTION } from "@/constants";
import { NextRequest } from "next/server";
import { Client } from "@notionhq/client";
import { AppRoutesResponse } from "@/utils/api";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isPageObjectResponse } from "@/utils/typeGuard";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: NextRequest) {
  const tags = request.nextUrl.searchParams.getAll("tag");

  const { results } = await notion.databases.query({
    database_id: NOTION.DEV_LOG_DATABASE_ID,
    filter: {
      and: [
        {
          property: "숨김",
          checkbox: {
            equals: false,
          },
        },
        {
          property: "상태",
          status: {
            equals: "완료",
          },
        },
        {
          or: [
            ...tags.map((tag) => {
              return {
                property: "태그",
                multi_select: {
                  contains: tag,
                },
              };
            }),
          ],
        },
      ],
    },
    sorts: [
      {
        property: "생성 일시",
        direction: "descending",
      },
    ],
  });

  const pages: PageObjectResponse[] = results.filter((value) =>
    isPageObjectResponse(value)
  );

  return AppRoutesResponse.json("/api/dev-log", {
    data: { pages },
    message: "",
  });
}
