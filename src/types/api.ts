import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

declare global {
  type TagName = string;
  type TagColor = string;

  type ResponseTemplate<T> = {
    data: T;
    message: string;
  };

  type ResponseData = {
    "/api/dev-log": ResponseTemplate<{ pages: PageObjectResponse[] }>;
    "/api/dev-log/tag": ResponseTemplate<{ tags: [TagName, TagColor][] }>;
  };
}
