import { NextResponse, type NextRequest } from "next/server";
import { githubUserSchema } from "@/types/api";
import { ApiRoutesErrorHandler } from "@/error";
import { octokit } from "@/utils";

export const POST = ApiRoutesErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const validateBody = githubUserSchema.parse(body);

  const { username } = validateBody;

  const { data } = await octokit.request("GET /users/{username}", {
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return NextResponse.json<ApiRoutes.Response<"/api/github/user">>(
    {
      data: {
        user: data,
      },
      message: "정상적으로 데이터를 불러왔습니다.",
    },
    {
      status: 200,
    }
  );
});
