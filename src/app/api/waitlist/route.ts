import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const TO_EMAIL = 'erenasiroglu1@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!resend) {
      console.log('📧 Waitlist signup (RESEND_API_KEY not configured):', email)
      return NextResponse.json(
        { message: 'Email logged (RESEND_API_KEY not configured)' },
        { status: 200 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Tadado Waitlist <noreply@tadado.app>',
      to: TO_EMAIL,
      subject: `New Waitlist Signup: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; margin-bottom: 16px;">New Waitlist Signup</h2>
          <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0; color: #27272a;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0 0 0; color: #27272a;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #71717a; font-size: 14px; margin-top: 24px;">
            This email was sent from the Tadado waitlist form.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Success', data }, { status: 200 })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
