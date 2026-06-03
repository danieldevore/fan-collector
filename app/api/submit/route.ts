import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, city } = await request.json()

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Append row to your sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(), // Timestamp
            name,
            email,
            city || "",
          ],
        ],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Google Sheets error:", error)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
