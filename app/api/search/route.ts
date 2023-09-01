import { getSearchableReviews } from '@/lib/reviews'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')
  const reviews = await getSearchableReviews(query)

  return NextResponse.json(reviews)
}
