import { GetServerSideProps } from "next";
import Layout from "@/features/ui/Layout";
import prisma from "@/lib/prisma";
import DetailPage, { SnippetDetailData } from "@/features/ui/DetailPage";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const snippetData = await prisma.codeSnippet.findUnique({
    where: {
      id: params.id,
    },
  })!;

  const snippet = {
    ...snippetData,
    markdownCode:
      `\`\`\`${snippetData!.used_program_language.toLowerCase()}\n` +
      snippetData!.code +
      `\n\`\`\``,
    createdAt: snippetData!.createdAt.toISOString(),
    updatedAt: snippetData!.updatedAt.toISOString(),
  };

  return {
    props: {
      snippet,
    },
  };
};

const SnippetDetail = ({ snippet }: { snippet: SnippetDetailData }) => {
  return (
    <Layout>
      <DetailPage snippet={snippet} />
    </Layout>
  );
};

export default SnippetDetail;
