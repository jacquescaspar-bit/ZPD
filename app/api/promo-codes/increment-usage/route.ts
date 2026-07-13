import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      error:
        "Promo usage is recorded after successful payment. Apply the code at checkout only.",
    },
    { status: 403 },
  );
}
