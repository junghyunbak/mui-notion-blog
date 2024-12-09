import { DetailContents } from "./_components/DetailContents";
import { type Metadata } from "next";
import {
  getTitleFromNotionPageObject,
  isPageObjectResponse,
  notion,
} from "@/utils";
import { NOTION } from "@/constants";
import { NotionAPI } from "notion-client";

const notionApi = new NotionAPI();

interface DevLogDetail {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: DevLogDetail): Promise<Metadata> {
  const page = await notion.pages.retrieve({
    page_id: id,
  });

  const title = (() => {
    if (!isPageObjectResponse(page)) {
      return "";
    }

    return getTitleFromNotionPageObject(
      page.properties[NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE]
    );
  })();

  return {
    title: `개발자 박정현 | ${title}`,
    openGraph: {
      title: `개발자 박정현 | ${title}`,
    },
  };
}

export const revalidate = 60;

export default async function DevLogDetail({ params: { id } }: DevLogDetail) {
  const recordMap = await notionApi.getPage(id);

  return <DetailContents recordMap={recordMap} />;
}
