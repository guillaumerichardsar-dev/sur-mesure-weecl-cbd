import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  console.log('[submit-mock] Payload reçu :', JSON.stringify(payload, null, 2));
  return NextResponse.json({ ok: true, message: 'Prototype — devis fictif enregistré' });
}
