//created by Brianna Matey

import { NextRequest, NextResponse } from 'next/server'
import getCollection from '@/db'
import type { User } from '@/types'

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            )
        }

        const users = await getCollection('users')


        const existing = await users.findOne({ email })
        if (existing) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 409 }
            )
        }


        const result = await users.insertOne({
            name,
            email,
            password,

        } as User)

        return NextResponse.json(
            { message: 'Account created successfully', userId: result.insertedId },
            { status: 201 }
        )

    } catch (err) {
        console.log('signup error: ' + err)
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}