import { NextResponse } from "next/server";

export function middleware(req) {
    if(!req.cookies.has('token')) {
        return NextResponse.redirect("/login");
    }
}/*

export const config = {
    matcher: [
        '/filme:path*',
        '/series:path*',
        'favoritos:path*'
    ]
}*/