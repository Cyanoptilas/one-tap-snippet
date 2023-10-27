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

  const tempSnippets = await prisma.codeSnippet.findMany({
    include: {
      author: true,
    },
    where: {
      author: {
        email: session!.user!.email,
      },
    },
  });
  const snippets = tempSnippets.map((tempSnippet: any) => ({
    ...tempSnippet,
    createdAt: tempSnippet.createdAt.toString(),
    updatedAt: tempSnippet.updatedAt.toString(),
  }));

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
  const favoriteSnippetIds: string[] = favoritesData.map((favoriteData) => {
    return favoriteData.snippetId;
  });

  return {
    props: {
      snippets,
      favoriteSnippetIds,
    },
  };
}

function MySnippets(props: {
  snippets: Snippet[];
  favoriteSnippetIds: string[];
}) {
  return <SnippetsViewPage {...props} />;
}

export default MySnippets;
