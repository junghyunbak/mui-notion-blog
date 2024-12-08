import { NOTION } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { AppRoutesResponse } from "@/utils/api";
import { Client } from "@notionhq/client";
import { isPageObjectResponse } from "@/utils/typeGuard";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  /*
  여기에 캐시 조건 넣으면 될듯
  fetch: 

   */
});

export async function GET() {
  const { results } = await notion.databases.query({
    database_id: NOTION.DEV_LOG_DATABASE_ID,
  });

  const tags: Map<string, string> = new Map();

  results.forEach((value) => {
    if (!isPageObjectResponse(value)) {
      return;
    }

    const tagProperties = value.properties["태그"];

    if (!tagProperties) {
      return;
    }

    if (tagProperties.type === "multi_select") {
      tagProperties.multi_select.forEach(({ name, color }) => {
        tags.set(name, color);
      });
    }
  });

  return AppRoutesResponse.json("/api/dev-log/tag", {
    data: { tags: Array.from(tags.entries()) },
    message: "",
  });
}
