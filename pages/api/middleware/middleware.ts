import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	// Get a cookie
	request.cookies.get('token')?.value
}