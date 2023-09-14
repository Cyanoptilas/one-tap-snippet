import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverSession = await getServerSession(req, res, authOptions);

  if (req.method === "DELETE") {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required for deletion." });
        return;
      }

      // 確認のため、現在ログインしているユーザーが本当にこのユーザーかどうかを確認
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || user.email !== serverSession!.user!.email!) {
        res.status(403).json({ error: "Permission denied." });
        return;
      }

      await prisma.user.delete({ where: { email } });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("🚀 ~ file: index.ts:31 ~ error:", error)
      res.status(500).json({ error: "Failed to delete the user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
