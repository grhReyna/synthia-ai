import { fetchReviewsFromSheet } from '@/lib/fetchReviews';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const reviews = await fetchReviewsFromSheet();
  return NextResponse.json(reviews);
}
