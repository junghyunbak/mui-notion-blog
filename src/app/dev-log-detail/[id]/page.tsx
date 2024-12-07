import { NotionAPI } from "notion-client";
import { DetailContents } from "./_components/DetailContents";
import { type Metadata } from "next";
import { Client } from "@notionhq/client";

const notion = new NotionAPI();

interface DevLogDetail {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: DevLogDetail): Promise<Metadata> {
  const data = await new Client({
    auth: process.env.NOTION_API_KEY,
  }).pages.retrieve({
    page_id: id,
  });

  const title = (() => {
    if (!("properties" in data)) {
      return "";
    }

    if (data.properties["이름"].type !== "title") {
      return "";
    }

    const [textItem] = data.properties["이름"].title;

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

export default async function DevLogDetail({ params: { id } }: DevLogDetail) {
  const recordMap = await notion.getPage(id);

  return <DetailContents recordMap={recordMap} />;
}
