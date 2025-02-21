import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://glore-bd-backend-node-mongo.vercel.app/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}
