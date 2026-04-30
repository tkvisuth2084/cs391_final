//Created by Brianna Matey
import { NextRequest, NextResponse } from "next/server"
import getCollection from "@/db"

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url)
        const email = searchParams.get("email")

        if (!email) {
            return NextResponse.json(
                { error: "Email required" },
                { status: 400 }
            )
        }

        const users = await getCollection("users")
        const user = await users.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(user)

    } catch (err) {
        console.log("GET profile error:", err)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { email, name, bio, avatarUrl } = await req.json()

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        const users = await getCollection("users")

        const result = await users.updateOne(
            { email },
            {
                $set: {
                    name,
                    bio,
                    avatarUrl,
                },
            }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            message: "Profile updated successfully",
        })

    } catch (err) {
        console.log("profile update error:", err)

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}