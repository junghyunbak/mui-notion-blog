import { Stack } from "@mui/material";
import { SnippetFilters } from "./_components/SnippetFilter";
import { SnippetList } from "./_components/SnippetList";

export default function Snippet() {
  return (
    <Stack>
      <SnippetFilters />
      <SnippetList />
    </Stack>
  );
}
