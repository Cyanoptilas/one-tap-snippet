import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverSession = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    try {
      const {
        function_name_jp,
        function_name_en,
        function_description,
        used_program_language,
        tags,
        code,
      } = req.body;

      const email: string | null = serverSession?.user?.email || null;

      if (!email) {
        res.status(400).json({ error: "Email is missing." });
        return;
      }

      const result = await prisma.codeSnippet.create({
        data: {
          function_name_jp: function_name_jp,
          function_name_en: function_name_en,
          function_description: function_description,
          used_program_language: used_program_language,
          tags: tags,
          code: code,
          author: { connect: { email: email } },
          updatedAt: new Date(),
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to save the code snippet." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
