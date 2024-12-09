import { NextRequest, NextResponse } from "next/server";
import {
  isNotionPropertyCorrectType,
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

  const tags: Map<TagName, { totalCount: number; completeCount: number }> =
    new Map();

  results.forEach((value) => {
    if (!isPageObjectResponse(value)) {
      return;
    }

    const tagProperty = (() => {
      const property = value.properties[tagPropertyName];

      if (
        !isNotionPropertyCorrectType(property, tagPropertyName, "multi_select")
      ) {
        return null;
      }

      return property;
    })();

    const statusProperty = (() => {
      if (!statusPropertyName) {
        return null;
      }

      const property = value.properties[statusPropertyName];

      if (
        !isNotionPropertyCorrectType(property, statusPropertyName, "status")
      ) {
        return null;
      }

      return property;
    })();

    if (!tagProperty) {
      return;
    }

    tagProperty.multi_select.forEach(({ name }) => {
      if (!tags.has(name)) {
        tags.set(name, { totalCount: 0, completeCount: 0 });
      }

      const countObj = tags.get(name);

      if (countObj) {
        countObj.totalCount++;

        if (
          statusProperty &&
          statusProperty.status?.name === statusCompleteSelectName
        ) {
          countObj.completeCount++;
        }
      }
    });
  });

  return NextResponse.json<ApiRoutes.Response<"/api/notion/databases/tags">>({
    data: { tags: Array.from(tags.entries()) },
    message: "",
  });
});
