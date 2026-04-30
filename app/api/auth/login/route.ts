//created by Brianna Matey

import { NextRequest, NextResponse } from 'next/server'
import getCollection from '@/db'
import type { User } from '@/types'

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        const users = await getCollection('users')

        const user = await users.findOne({ email, password }) as User | null
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { message: 'Login successful', name: user.name, email: user.email },
            { status: 200 }
        )

    } catch (err) {
        console.log('login error: ' + err)
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}