import { NextResponse } from "next/server";

function b64urlDecode(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  return Buffer.from(s + "=".repeat(pad), "base64").toString();
}

export function GET() {
  const raw =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  let role: string | null = null;
  try {
    role = raw ? JSON.parse(b64urlDecode(raw.split(".")[1]))?.role ?? null : null;
  } catch {}
  return NextResponse.json({
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    keyPresent: !!raw,
    decodedRole: role, // should be "service_role"
  });
}
