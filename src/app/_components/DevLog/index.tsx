"use client";

import { Filter } from "./Filter";
import { Pages } from "./Pages";

interface DevLogProps {}

export function DevLog({}: DevLogProps) {
  return (
    <>
      <Filter />
      <Pages />
    </>
  );
}
