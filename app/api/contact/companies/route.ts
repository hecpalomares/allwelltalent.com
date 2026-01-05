import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { companyName, contactName, email, hiringNeeds } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !hiringNeeds) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'All Well Talent <notifications@allwelltalent.com>',
      to: 'karla@allwelltalent.com',
      subject: `New Company Inquiry: ${companyName}`,
      html: `
        <h2>New Company Hiring Request</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Hiring Needs:</strong></p>
        <p>${hiringNeeds.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Submitted via All Well Talent website</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
