"use client";

import { GradientPaper } from "@/components/core/GradientPaper";
import theme from "@/theme";
import {
  Box,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";

const steps = ["저는", "블로그는", "또"];
const messages = [
  "안녕하세요👋 프론트엔드 개발자 박정현입니다.",
  "🚀MUI, Notion API, Github API를 활용해서 만들었어요.",
  "🤔 또 어떤 내용을 담으면 좋을까요?",
];

export function IntroStepper() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <GradientPaper
      sx={{
        wid3h: "100%",
        height: "100%",
        p: 4,
        [theme.breakpoints.down("sm")]: {
          p: 3,
        },
      }}
    >
      <Stack
        sx={{ width: "100%", height: "100%", justifyContent: "space-between" }}
        spacing={2}
      >
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step key={i}>
              <StepButton onClick={() => setActiveStep(i)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>

        <Typography
          noWrap
          sx={{
            color: "#303741",
            fontSize: "1rem",
            [theme.breakpoints.down("sm")]: {
              fontSize: "0.875rem",
            },
          }}
        >
          {messages[activeStep]}
        </Typography>
      </Stack>
    </GradientPaper>
  );
}
