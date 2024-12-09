import { NextRequest, NextResponse } from "next/server";
import { githubRepoSchema } from "@/types/api";
import { ApiRoutesErrorHandler } from "@/error";
import { octokit } from "@/utils";

export const POST = ApiRoutesErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const validateBody = githubRepoSchema.parse(body);

  const { owner, repo } = validateBody;

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return NextResponse.json<ApiRoutes.Response<"/api/github/releases">>(
    { data: { releases: data }, message: "" },
    {
      status: 200,
    }
  );
});
