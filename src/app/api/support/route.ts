import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const TO_EMAIL = 'erenasiroglu1@gmail.com'
const MESSAGE_MAX_LENGTH = 2000

function sanitize (str: string, maxLen: number): string {
  return str.trim().slice(0, maxLen)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const rawEmail = typeof body.email === 'string' ? body.email : ''
    const rawMessage = typeof body.message === 'string' ? body.message : ''
    const email = sanitize(rawEmail, 254)
    const message = sanitize(rawMessage, MESSAGE_MAX_LENGTH)

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (!resend) {
      console.log('📧 Support form (RESEND_API_KEY not configured):', { email, message: message.slice(0, 100) })
      return NextResponse.json(
        { message: 'Message received (email not configured)' },
        { status: 200 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Tadado Support <noreply@tadado.app>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `Support: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; margin-bottom: 16px;">Support request</h2>
          <div style="background: #f4f4f5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0; color: #27272a;"><strong>From:</strong> ${email}</p>
            <p style="margin: 8px 0 0 0; color: #27272a;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background: #fff; border: 1px solid #e4e4e7; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; color: #71717a; font-size: 12px; text-transform: uppercase;">Message</p>
            <p style="margin: 0; color: #27272a; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <p style="color: #71717a; font-size: 14px; margin-top: 24px;">
            This email was sent from the Tadado support form.
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Success', data }, { status: 200 })
  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
