import {
  type QueryDatabaseResponse,
  type PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export function isPageObjectResponse(
  value: QueryDatabaseResponse["results"][number]
): value is PageObjectResponse {
  if (!(value.object === "page")) {
    return false;
  }

  if (!("properties" in value)) {
    return false;
  }

  return true;
}
