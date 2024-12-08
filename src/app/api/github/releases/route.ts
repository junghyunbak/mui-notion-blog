import { AppRoutesResponse } from "@/utils/api";
import { NextResponse, type NextRequest } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});

export async function GET(request: NextRequest) {
  const owner = request.nextUrl.searchParams.get("owner");
  const repo = request.nextUrl.searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.error();
  }

  const { data } = await octokit.request("GET /repos/{owner}/{repo}/releases", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return AppRoutesResponse.json("/api/github/releases", {
    data: {
      releases: data,
    },
    message: "",
  });
}
