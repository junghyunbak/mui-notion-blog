import { NextRequest, NextResponse } from "next/server";
import { isPageObjectResponse, notion } from "@/utils";
import { ApiRoutesErrorHandler } from "@/error";
import { databaseTagsSchema } from "@/types/api";

export const POST = ApiRoutesErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const validateBody = databaseTagsSchema.parse(body);

  const { databaseId } = validateBody;

  // [ ]: 존재하는 모든 데이터베이스 페이지들을 가져오도록 수정
  const { results } = await notion.databases.query({
    database_id: databaseId,
  });

  const tags: Map<TagName, TagCount> = new Map();

  results.forEach((value) => {
    if (!isPageObjectResponse(value)) {
      return;
    }

    const tagProperties = value.properties["태그"];

    if (!tagProperties) {
      return;
    }

    if (tagProperties.type === "multi_select") {
      tagProperties.multi_select.forEach(({ name }) => {
        tags.set(name, (tags.get(name) || 0) + 1);
      });
    }
  });

  return NextResponse.json<ApiRoutes.Response<"/api/notion/databases/tags">>({
    data: { tags: Array.from(tags.entries()) },
    message: "",
  });
});
