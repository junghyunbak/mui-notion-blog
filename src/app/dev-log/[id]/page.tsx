import { DetailContents } from "./_components/DetailContents";
import { type Metadata } from "next";
import { isNotionPropertyCorrectType, notion } from "@/utils";
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
    if (!("properties" in page)) {
      return "";
    }

    const property = page.properties[NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE];

    if (
      !isNotionPropertyCorrectType(
        property,
        NOTION.DEV_LOG_DATABASE.PROPERTY.TITLE,
        "title"
      )
    ) {
      return;
    }

    const [textItem] = property.title;

    if (textItem.type !== "text") {
      return "";
    }

    return textItem.text.content;
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
