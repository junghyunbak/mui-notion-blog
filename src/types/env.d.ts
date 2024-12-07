import NodeJS from "node";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOTION_API_KEY?: string;
    }
  }
}
