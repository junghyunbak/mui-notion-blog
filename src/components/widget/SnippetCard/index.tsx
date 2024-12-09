import { GradientCard } from "@/components/core/GradientCard";
import {
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

interface SnippetCard {
  title: string;
  imageUrl: string;
  tags: string[];
  handleCardClick: () => void;
}

export function SnippetCard({
  title,
  tags,
  imageUrl,
  handleCardClick,
}: SnippetCard) {
  return (
    <GradientCard>
      <CardActionArea sx={{ display: "flex" }} onClick={handleCardClick}>
        <CardMedia image={imageUrl} sx={{ width: "100px", height: "100px" }} />

        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Typography variant="body1" noWrap gutterBottom>
            {title}
          </Typography>

          <Stack direction="row" flexWrap="wrap" spacing={0.5}>
            {tags.map((tag, i) => (
              <Chip key={i} label={tag} size="small" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </GradientCard>
  );
}
