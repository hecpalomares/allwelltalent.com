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
    const { fullName, email, linkedinUrl, primaryTech, yoe, location } = body;

    // Validate required fields
    if (!fullName || !email || !linkedinUrl || !primaryTech || !yoe || !location) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'All Well Talent <notifications@allwelltalent.com>',
      to: 'karla@allwelltalent.com',
      subject: `New Talent Application: ${fullName}`,
      html: `
        <h2>New Talent Application</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>
        <p><strong>Primary Tech:</strong> ${primaryTech}</p>
        <p><strong>Years of Experience:</strong> ${yoe}</p>
        <p><strong>Location:</strong> ${location}</p>
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
