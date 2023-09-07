import SnippetsViewPage, { Snippet } from "@/features/ui/SnippetsViewPage";
import prisma from "@/lib/prisma";

export async function getServerSideProps() {
  const tempSnippets = await prisma.codeSnippet.findMany();

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

const Snippets = ({ snippets }: { snippets: Snippet[] }) => {
  return <SnippetsViewPage snippets={snippets} />;
};

export default Snippets;
