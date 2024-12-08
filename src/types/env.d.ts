import NodeJS from "node";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOTION_API_KEY?: string;
      GITHUB_API_TOKEN?: string;
    }
  }
}
