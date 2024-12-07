import { NextResponse } from "next/server";

export class AppRoutesResponse {
  static json<T extends keyof ResponseData>(
    /**
     * `pathname`은 실제로 사용되지 않는 매개인자.
     * 올바른 리턴 값을 전달하기 위한 장치
     */
    pathname: T,
    data: ResponseData[T]
  ) {
    return NextResponse.json(data);
  }
}
