// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // <- must be this import

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert({ name, email, phone, message })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, lead: data }, { status: 201 });
}
