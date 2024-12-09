import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { type Endpoints } from "@octokit/types";
import { z } from "zod";

export const databaseTagsSchema = z.object({
  databaseId: z.string(),
  tagPropertyName: z.string(),
  statusPropertyName: z.string().optional(),
  statusCompleteSelectName: z.string().optional(),
});

export const databaseSchema = z.object({
  databaseId: z.string(),
  tagPropertyName: z.string(),
  tags: z.string().array(),
  hiddenChkBoxPropertyName: z.string(),
  datePropertyName: z.string().optional(),
});

export const githubRepoSchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

export const githubUserSchema = z.object({
  username: z.string(),
});

declare global {
  type TagName = string;

  type ResponseTemplate<T> = {
    data: T;
    message: string;
  };

  namespace ApiRoutes {
    type Paths =
      | "/api/notion/databases"
      | "/api/notion/databases/tags"
      | "/api/github/releases"
      | "/api/github/user";

    type ResponseData = {
      "/api/notion/databases": ResponseTemplate<{
        pages: PageObjectResponse[];
      }>;
      "/api/notion/databases/tags": ResponseTemplate<{
        tags: [TagName, { completeCount: number; totalCount: number }][];
      }>;
      "/api/github/releases": ResponseTemplate<{
        releases: Endpoints["GET /repos/{owner}/{repo}/releases"]["response"]["data"];
      }>;
      "/api/github/user": ResponseTemplate<{
        user: Endpoints["GET /users/{username}"]["response"]["data"];
      }>;
    };

    type Response<T extends Paths> = ResponseData[T];

    type RequestData = {
      "/api/notion/databases": z.infer<typeof databaseSchema>;
      "/api/notion/databases/tags": z.infer<typeof databaseTagsSchema>;
      "/api/github/releases": z.infer<typeof githubRepoSchema>;
      "/api/github/user": z.infer<typeof githubUserSchema>;
    };

    type Request<T extends Paths> = RequestData[T];
  }
}
