import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isNotionPropertyCorrectType } from "./typeGuard";
import noImage from "@/assets/image/no-image.jpg";

type Property = PageObjectResponse["properties"][number];
type Cover = PageObjectResponse["cover"];
type Icon = PageObjectResponse["icon"];

export const getTitleFromNotionPageObject = (property: Property) => {
  if (!isNotionPropertyCorrectType(property, "title")) {
    return "";
  }

  // [ ]: 배열에서 뽑은 값이 undefined일 수 있지만 타입 체크가 안되는 상태
  const [textItem] = property.title;

  if (!textItem) {
    return "";
  }

  if (textItem.type !== "text") {
    return "";
  }

  return textItem.text.content;
};

export const getImageUrlFromNotionPageObject = (cover: Cover) => {
  if (!cover) {
    return noImage.src;
  }

  if (cover.type === "external") {
    return cover.external.url;
  }

  return cover.file.url;
};

export const getIconUrlFromNotionPageObject = (icon: Icon) => {
  if (!icon) {
    return "";
  }

  if (icon.type === "emoji") {
    return icon.emoji;
  }

  if (icon.type === "external") {
    return icon.external.url;
  }

  return icon.file.url;
};

export const getCreateTimeFromNotionPageObject = (property: Property) => {
  if (!isNotionPropertyCorrectType(property, "created_time")) {
    return new Date(0);
  }

  return new Date(property.created_time);
};

export const getTagsFromNotionPageObject = (property: Property) => {
  if (!isNotionPropertyCorrectType(property, "multi_select")) {
    return [];
  }

  return property.multi_select.map((select) => select.name);
};

export const getStatusFromNotionPageObject = (property: Property) => {
  if (!isNotionPropertyCorrectType(property, "status")) {
    return null;
  }

  return property.status;
};
