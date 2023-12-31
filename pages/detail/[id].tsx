import { GetServerSideProps } from "next";
import Layout from "@/features/components/Layout";
import prisma from "@/lib/prisma";
import DetailPage, { SnippetDetailData } from "@/features/components/DetailPage";

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
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const snippet = {
    ...snippetData,
    markdownCode:
      `\`\`\`${snippetData!.used_program_language
        .replace(".", "")
        .toLowerCase()}\n` +
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
