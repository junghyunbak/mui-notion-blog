import { NextRequest, NextResponse } from "next/server";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isPageObjectResponse, notion } from "@/utils";
import { databaseSchema } from "@/types/api";
import { ApiRoutesErrorHandler } from "@/error";

export const POST = ApiRoutesErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const validateData = databaseSchema.parse(body);

  const { databaseId, tags, tagProperty, hiddenChkBoxPropertyName } =
    validateData;

  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: hiddenChkBoxPropertyName,
          checkbox: {
            equals: false,
          },
        },
        {
          or: [
            ...tags.map((tag) => {
              return {
                property: tagProperty,
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

  return NextResponse.json<ApiRoutes.Response<"/api/notion/databases">>({
    data: {
      pages,
    },
    message: "정상적으로 데이터를 불러왔습니다.",
  });
});
