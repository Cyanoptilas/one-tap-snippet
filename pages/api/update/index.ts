import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverSession = await getServerSession(req, res, authOptions);

  if (req.method === "PUT") {
    try {
      const {
        id,
        function_name_jp,
        function_name_en,
        function_description,
        used_program_language,
        tags,
        // code は編集不可のため更新しない
      } = req.body;

      if (!id) {
        res.status(400).json({ error: "ID is required for updating." });
        return;
      }

      const result = await prisma.codeSnippet.update({
        where: { id: id },
        data: {
          function_name_jp: function_name_jp,
          function_name_en: function_name_en,
          function_description: function_description,
          used_program_language: used_program_language,
          tags: tags,
          author: { connect: { email: serverSession!.user!.email! } },
          updatedAt: new Date(),
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the code snippet." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
