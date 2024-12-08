import { AppRoutesResponse } from "@/utils/api";
import { NextResponse, type NextRequest } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.error();
  }

  const { data } = await octokit.request("GET /users/{username}", {
    username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return AppRoutesResponse.json("/api/github/user", {
    data: {
      user: data,
    },
    message: "",
  });
}
