import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { type Endpoints } from "@octokit/types";

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
    "/api/github/releases": ResponseTemplate<{
      releases: Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]["data"];
    }>;
    "/api/github/user": ResponseTemplate<{
      user: Endpoints["GET /users/{username}"]["response"]["data"];
    }>;
  };
}
