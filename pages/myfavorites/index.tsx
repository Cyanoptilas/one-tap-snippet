import SnippetsViewPage, { Snippet } from "@/features/components/SnippetsViewPage";
import prisma from "@/lib/prisma";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        snippets: [],
      },
    };
  }

  // お気に入りのスニペットIDを取得
  const favoritesData = await prisma.favoriteSnippet.findMany({
    select: {
      snippetId: true,
    },
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  const favoriteSnippetIds: string[] = favoritesData.map(
    (favoriteData) => favoriteData.snippetId
  );

  // お気に入りのスニペットを取得
  const tempSnippets = await prisma.codeSnippet.findMany({
    where: {
      favorites: {
        some: {
          user: {
            email: session?.user?.email,
          },
        },
      },
    },
  });

  // 日付を文字列に変換
  const snippets = tempSnippets.map((tempSnippet: any) => ({
    ...tempSnippet,
    createdAt: tempSnippet.createdAt.toString(),
    updatedAt: tempSnippet.updatedAt.toString(),
  }));

  return {
    props: {
      snippets,
      favoriteSnippetIds,
    },
  };
}

function MyFavorites(props: {
  snippets: Snippet[];
  favoriteSnippetIds: string[];
}) {
  return <SnippetsViewPage {...props} />;
}

export default MyFavorites;
