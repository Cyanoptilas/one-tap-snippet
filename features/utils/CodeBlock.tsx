import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Box } from "@chakra-ui/react";

const customCode: CodeComponent = ({ inline, className, children }) => {
  const style = a11yDark;
  const match = /language-(\w+)(:?.+)?/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  const name = match && match[2] ? match[2].slice(1) : "";
  return !inline && match ? (
    // ブロックコード+シンタックスハイライト
    <Box width="100%">
      {name && <span>{name}</span>}
      <SyntaxHighlighter style={style} language={lang} PreTag="div">
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </Box>
  ) : (
    // インラインコード
    <Box
      display="inline-block"
      whiteSpace="pre-wrap"
      backgroundColor="gray.200"
      borderRadius="md"
      px={1}
      py={0.5}
    >
      <code>{children}</code>
    </Box>
  );
};
export const CodeBlock = {
  code: customCode,
};
