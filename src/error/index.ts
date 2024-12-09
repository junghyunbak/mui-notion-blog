import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const ApiRoutesErrorHandler =
  (fn: (req: NextRequest) => Promise<NextResponse>) =>
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      return await fn(req);
    } catch (e) {
      if (e instanceof ZodError) {
        return NextResponse.json<ResponseTemplate<null>>(
          { data: null, message: "잘못된 요청입니다." },
          {
            status: 400,
          }
        );
      } else if (e instanceof Error) {
        if ("status" in e && typeof e.status === "number") {
          return NextResponse.json<ResponseTemplate<null>>(
            {
              data: null,
              message: `외부 API 에러가 발생하였습니다.\n\n${e.message}`,
            },
            {
              status: e.status,
            }
          );
        }

        return NextResponse.json<ResponseTemplate<null>>(
          {
            data: null,
            message: e.message,
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json<ResponseTemplate<null>>(
        {
          data: null,
          message: "알 수 없는 에러가 발생했습니다.",
        },
        {
          status: 500,
        }
      );
    }
  };
