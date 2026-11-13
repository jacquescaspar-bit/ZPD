import { NextResponse } from "next/server";

const GUIDE_PATH = "/blog/is-tutoring-the-right-fit";

/** Wave or audience codes: w11, w12, w11-school, w11-clinic, w11-pc. */
const CODE_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;

interface OutreachClickContext {
  params: Promise<{ code: string }>;
}

export async function GET(request: Request, context: OutreachClickContext) {
  const { code } = await context.params;

  if (!CODE_PATTERN.test(code)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const campaign = code.toLowerCase();
  const destination = new URL(GUIDE_PATH, request.url);
  destination.searchParams.set("utm_source", "email");
  destination.searchParams.set("utm_medium", "outreach");
  destination.searchParams.set("utm_campaign", campaign);

  console.warn(
    JSON.stringify({
      event: "outreach_click",
      code: campaign,
      path: new URL(request.url).pathname,
    }),
  );

  return NextResponse.redirect(destination, 307);
}
