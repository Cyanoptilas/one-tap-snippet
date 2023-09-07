import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { CodeBlock } from "../utils/CodeBlock";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import { FC } from "react";
import Link from "next/link";

interface Props {
  content: string;
  ogpDatas?: any;
}

const MarkdownDisplay: FC<Props> = ({ content, ogpDatas }) => {
  return (
    <ReactMarkdown
      // rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      linkTarget="_blank"
      components={ChakraUIRenderer({
        code: CodeBlock.code,
        blockquote: ({ children }) => (
          <Box
            as="blockquote"
            pl={4}
            my={4}
            borderLeft="4px solid"
            borderLeftColor="blue.400"
            fontStyle="italic"
            color="gray.600"
          >
            <Text>{children}</Text>
          </Box>
        ),
      })}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownDisplay;
