import { NextResponse } from 'next/server'

export async function POST(request) {
  const payload = await request.json()
  console.log('🔥 ~ POST ~ payload:', payload)

  return new Response(null, {status: 204})
}
