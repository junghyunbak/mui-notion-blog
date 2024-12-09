import { Client } from "@notionhq/client";
import { Octokit } from "@octokit/rest";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN,
});
