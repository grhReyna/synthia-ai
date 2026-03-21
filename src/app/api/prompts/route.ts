import { fetchPromptsFromSheet } from '@/lib/fetchPrompts';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const prompts = await fetchPromptsFromSheet();
  return NextResponse.json(prompts);
}
