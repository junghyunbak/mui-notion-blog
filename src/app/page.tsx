import * as React from "react";
import { DevLog } from "./_components/DevLog";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "개발자 박정현",
  };
}

export default async function Home() {
  return (
    <>
      <DevLog />
    </>
  );
}
