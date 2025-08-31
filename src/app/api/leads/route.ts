import { NextRequest, NextResponse } from 'next/server';

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  source?: string;
  message?: string; // ✅ optional
};

function isEmail(s: string): boolean {
  return /^\S+@\S+\.\S+$/.test(s);
}

export async function POST(req: NextRequest) {
  let data: Partial<LeadPayload>;
  try {
    data = (await req.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const phone = (data.phone ?? '').trim();
  const source = (data.source ?? '').trim();
  const message = (data.message ?? '').trim(); // ✅ capture optional description

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // --- Option A: Log-only (smoke test) ---
  console.log('[Lead] incoming:', { name, email, phone, source, message });

  // --- Option B: Supabase insert (uncomment + configure env) ---
  // import { createClient } from '@supabase/supabase-js';
  // const supabase = createClient(
  //   process.env.SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!
  // );
  // const { error } = await supabase
  //   .from('leads')
  //   .insert([{ name, email, phone, source, message, created_at: new Date().toISOString() }]);
  // if (error) {
  //   console.error('Supabase insert error:', error);
  //   return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  // }

  return NextResponse.json({ ok: true }, { status: 201 });
}
