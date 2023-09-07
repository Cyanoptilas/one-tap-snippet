import SnippetsViewPage, { Snippet } from "@/features/ui/SnippetsViewPage";
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

  return {
    props: {
      snippets,
    },
  };
}

function MySnippets({ snippets }: { snippets: Snippet[] }) {
  return <SnippetsViewPage snippets={snippets} />;
}

export default MySnippets;
