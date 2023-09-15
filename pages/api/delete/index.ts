import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { ids } = req.body;

    try {
      await prisma.codeSnippet.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      res.status(200).json({ message: "Snippets deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete snippets" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
