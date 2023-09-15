import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("START")
    const transporter = createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log("🚀 ~ file: index.ts:18 ~ transporter:", transporter)
    const result = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: "お問い合わせ",
      text: req.body,
    });
    console.log("🚀 ~ file: index.ts:24 ~ result:", result)

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log("🚀 ~ file: index.ts:32 ~ e:", e)
    res.status(500).json({
      success: false,
      error: (e as Error).message,
    });
  }
}
