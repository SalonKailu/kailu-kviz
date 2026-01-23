import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await sql`
   INSERT INTO quiz_analytics (
    id, session_id, timestamp, client_ip, user_agent, 
    step, answers, result, current_question, url, referrer, discount_code
  ) VALUES (
    ${data.id},
    ${data.sessionId},
    ${data.timestamp},
    ${data.clientIP},
    ${data.userAgent},
    ${data.step},
    ${JSON.stringify(data.answers)},
    ${JSON.stringify(data.result)},
    ${data.currentQuestion},
    ${data.url},
    ${data.referrer},
    ${data.discountCode}
  )
`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM quiz_analytics 
      ORDER BY timestamp DESC
    `;
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}