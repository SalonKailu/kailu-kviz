import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('ENV CHECK:', process.env.RESEND_API_KEY ? 'API key exists' : 'API key MISSING');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const { email, discountCode, result, skinType, productUrl } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Kailu Diagnostika <info@kailushop.cz>',
      to: [email],
      subject: 'Výsledek vaší pleťové diagnostiky',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Poppins, sans-serif;
                line-height: 1.7;
                color: #2d2d2d;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f1eae2;
              }
              .header {
                background: #ffffff;
                padding: 40px 30px;
                text-align: center;
                border-radius: 14px 14px 0 0;
                border-bottom: 1px solid #eee;
              }
              .header h1 {
                margin: 0;
                font-size: 26px;
                font-weight: 600;
                color: #1f1f1f;
              }
              .content {
                background: #ffffff;
                padding: 35px 30px;
                border-radius: 0 0 14px 14px;
              }
              .result-box {
                background: #faf7f4;
                padding: 24px;
                border-radius: 12px;
                margin: 28px 0;
              }
              .result-box h3 {
                margin-bottom: 6px;
                font-size: 16px;
                color: #555;
              }
              .discount-box {
                background: #faf7f4;
                border: 1px solid #e5dcd3;
                padding: 26px;
                border-radius: 12px;
                text-align: center;
                margin: 32px 0;
              }
              .discount-code {
                font-size: 30px;
                font-weight: 600;
                color: #1f1f1f;
                letter-spacing: 1px;
                font-family: monospace;
                padding: 10px 16px;
                background: #ffffff;
                border-radius: 8px;
                display: inline-block;
                margin: 12px 0;
              }
              .warning-box {
                background: #fff5f5;
                border: 1px solid #f3caca;
                padding: 26px;
                border-radius: 12px;
                margin: 30px 0;
                color: #7a2d2d;
              }
              .cta-button {
                display: inline-block;
                background: #1f1f1f;
                color: #ffffff;
                padding: 16px 42px;
                text-decoration: none;
                border-radius: 999px;
                font-weight: 500;
                margin: 24px 0;
              }
              .footer {
                text-align: center;
                padding: 26px 10px 10px;
                color: #777;
                font-size: 13px;
              }
              a {
                color: #1f1f1f;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Výsledek vaší pleťové diagnostiky</h1>
            </div>

            <div class="content">
              <p>
                Děkuji, že jste si udělali čas na diagnostiku pleti.
                Na základě vašich odpovědí už máme jasno v tom,
                <strong>co vaší pleti dává smysl a čemu je lepší se vyhnout</strong>.
              </p>

              <div class="result-box">
                <h3>Váš typ pleti</h3>
                <p><strong>${skinType}</strong></p>

                <h3 style="margin-top: 18px;">Doporučená péče</h3>
                <p><strong>${result}</strong></p>
              </div>

              ${
                result === 'Dermatitida'
                  ? `
                <div class="warning-box">
                  <h3>Individuální posouzení pleti</h3>
                  <p>
                    U dermatitidy je potřeba vidět stav pleti,
                    aby bylo doporučení opravdu přesné a bezpečné.
                  </p>
                  <p>
                    Pošlete mi prosím fotografii postižených míst
                    (na denním světle) na:
                  </p>
                  <p style="font-size: 16px; font-weight: 600;">
                    <a href="mailto:info@kailu.cz">info@kailu.cz</a>
                  </p>
                  <p style="font-size: 14px; color: #666;">
                    Ozvu se vám nejpozději do 24 hodin s konkrétním návrhem péče.
                  </p>
                </div>
              `
                  : `
                <div class="discount-box">
                  <h3>Malý dárek pro vás</h3>
                  <p>
                    Aby pro vás bylo rozhodování jednodušší,
                    můžete nyní využít slevový kód:
                  </p>
                  <div class="discount-code">${discountCode}</div>
                  <p style="font-size: 14px; color: #666;">
                    Kód zadáte v košíku.<br>
                    Platnost 24 hodin od doručení e-mailu.
                  </p>
                </div>

                <div style="text-align: center;">
                  <a href="${productUrl}" class="cta-button">
                    Podívat se na doporučenou sadu
                  </a>
                </div>
              `
              }

              <p style="margin-top: 34px;">
                Pokud máte otázky nebo si nejste jistí,
                napište mi – ráda vám poradím.
              </p>

              <p>
                Karolína<br>
                <span style="color:#777;">Kailu</span>
              </p>
            </div>

            <div class="footer">
              <p>
                Kailu – kosmetika na míru<br>
                <a href="https://www.kailushop.cz">www.kailushop.cz</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
