import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Používáme || aby si kód vzal data, ať už přijdou s podtržítkem nebo bez
    const sessionId = data.session_id || data.sessionId;
    const clientIp = data.client_ip || data.clientIP;
    const discountCode = data.discount_code || data.discountCode;

    await sql`
      INSERT INTO quiz_analytics (
        id, session_id, timestamp, client_ip, user_agent, 
        step, answers, result, current_question, url, referrer, discount_code
      ) VALUES (
        ${data.id},
        ${sessionId}, 
        ${data.timestamp},
        ${clientIp}, 
        ${data.userAgent},
        ${data.step},
        ${JSON.stringify(data.answers)},
        ${JSON.stringify(data.result)},
        ${data.current_question || data.currentQuestion},
        ${data.url},
        ${data.referrer},
        ${discountCode} 
      )
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        step = EXCLUDED.step,
        answers = EXCLUDED.answers,
        result = EXCLUDED.result,
        current_question = EXCLUDED.current_question,
        discount_code = EXCLUDED.discount_code,
        timestamp = EXCLUDED.timestamp
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save analytics' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM quiz_analytics ORDER BY timestamp DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}