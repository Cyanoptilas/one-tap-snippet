import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const serverSession = await getServerSession(req, res, authOptions);

  if (!serverSession) {
    res.status(401).json({ error: "Not authenticated." });
    return;
  }

  if (req.method === "POST") {
    try {
      const { snippetId } = req.body;

      if (!snippetId) {
        res.status(400).json({ error: "Snippet ID is required." });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { email: serverSession!.user!.email as string },
      });

      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      const favorite = await prisma.favoriteSnippet.findUnique({
        where: {
          userId_snippetId: {
            userId: user.id,
            snippetId: snippetId,
          },
        },
      });

      if (favorite) {
        // 登録済みスニペットだった場合、対象のレコードを削除する
        await prisma.favoriteSnippet.delete({
          where: {
            userId_snippetId: {
              userId: user.id,
              snippetId: snippetId,
            },
          },
        });
        const updatedFavorites = (
          await prisma.favoriteSnippet.findMany({
            where: {
              userId: user.id,
            },
          })
        ).map((fav) => fav.snippetId);

        res
          .status(200)
          .json({ message: "Removed from favorites.", updatedFavorites });
      } else {
        // 未登録のスニペットだった場合、新規にDB登録する
        await prisma.favoriteSnippet.create({
          data: {
            userId: user.id,
            snippetId: snippetId,
          },
        });

        const updatedFavorites = (
          await prisma.favoriteSnippet.findMany({
            where: {
              userId: user.id,
            },
          })
        ).map((fav) => fav.snippetId);

        res
          .status(200)
          .json({ message: "Added to favorites.", updatedFavorites });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to toggle favorite." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
