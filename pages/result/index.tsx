import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/features/ui/Layout";
import Loading from "@/features/ui/Loading";
import DetailPage, { SnippetDetailData } from "@/features/ui/DetailPage";
import { useDisclosure } from "@chakra-ui/react";

const CodeSnippetResult = () => {
  const router = useRouter();

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
        markdownCode:
          `\`\`\`${parsedData.used_program_language!.toLowerCase()}\n` +
          parsedData.code +
          `\n\`\`\``,
      });
    }
  }, []);

  if (!data) {
    return <Loading isOpen={isOpen} onClose={onClose} />;
  }

  console.log("🚀 ~ file: index.tsx:79 ~ CodeSnippetResult ~ data:", data);
  return (
    <Layout>
      <DetailPage snippet={data} />
    </Layout>
  );
};

export default CodeSnippetResult;
