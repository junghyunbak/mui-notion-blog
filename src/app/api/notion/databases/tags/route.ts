import { NextRequest, NextResponse } from "next/server";
import {
  getStatusFromNotionPageObject,
  getTagsFromNotionPageObject,
  isPageObjectResponse,
  notion,
} from "@/utils";
import { ApiRoutesErrorHandler } from "@/error";
import { databaseTagsSchema } from "@/types/api";

export const POST = ApiRoutesErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const validateBody = databaseTagsSchema.parse(body);

  const {
    databaseId,
    tagPropertyName,
    statusPropertyName,
    statusCompleteSelectName,
  } = validateBody;

  // [ ]: 존재하는 모든 데이터베이스 페이지들을 가져오도록 수정
  const { results } = await notion.databases.query({
    database_id: databaseId,
  });

  const tagToCount: Map<
    TagName,
    { totalCount: number; completeCount: number }
  > = new Map();

  results.forEach((value) => {
    if (!isPageObjectResponse(value)) {
      return;
    }

    const { properties } = value;

    const tags = getTagsFromNotionPageObject(properties[tagPropertyName]);
    const status = getStatusFromNotionPageObject(
      properties[statusPropertyName || ""]
    );

    tags.forEach((tag) => {
      if (!tagToCount.has(tag)) {
        tagToCount.set(tag, { totalCount: 0, completeCount: 0 });
      }

      const countObj = tagToCount.get(tag);

      if (!countObj) {
        return;
      }

      countObj.totalCount++;

      if (status && status.name === statusCompleteSelectName) {
        countObj.completeCount++;
      }
    });
  });

  return NextResponse.json<ApiRoutes.Response<"/api/notion/databases/tags">>({
    data: { tags: Array.from(tagToCount.entries()) },
    message: "",
  });
});
