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

type ExtractType<T, U> = T extends { type: U } ? T : never;

type NotionPageObjectdProperties<T = PageObjectResponse["properties"][number]> =
  T extends { type: string } ? T["type"] : never;

export function isNotionPropertyCorrectType<
  T extends NotionPageObjectdProperties
>(
  property: PageObjectResponse["properties"][number] | undefined,
  type: T
): property is ExtractType<PageObjectResponse["properties"][number], T> {
  if (!property) {
    return false;
  }

  if (property.type !== type) {
    return false;
  }

  return true;
}
