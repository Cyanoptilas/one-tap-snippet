import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/components/Layout";
import Loading from "@/features/components/Loading";
import DetailPage, { SnippetDetailData } from "@/features/components/DetailPage";
import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const CodeSnippetResult = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState<SnippetDetailData | null>(null);
  const { isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (router.query.data) {
      const dataString = Array.isArray(router.query.data)
        ? router.query.data[0]
        : router.query.data;
      const parsedData: SnippetDetailData = JSON.parse(dataString);

      setData({
        ...parsedData,
        author: {
          name: session!.user!.name ?? "NoName",
          email: session!.user!.email!,
        },
        markdownCode:
          `\`\`\`${parsedData.used_program_language!.toLowerCase()}\n` +
          parsedData.code +
          `\n\`\`\``,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <Loading isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <Layout>
      <DetailPage snippet={data} />
    </Layout>
  );
};

export default CodeSnippetResult;
