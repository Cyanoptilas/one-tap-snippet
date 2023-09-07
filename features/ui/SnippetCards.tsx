import {
  Box,
  Checkbox,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useLongPress } from "use-long-press";
import { siteConfig } from "../configs/site";
import { Snippet, useStates } from "./SnippetsViewPage";
import { useRouter } from "next/router";

interface SnippetCardsProps {
  displayedSnippets: any;
}

function SnippetCards({ displayedSnippets }: SnippetCardsProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const isTopPage: boolean = router.pathname === "/";

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const cardDesigns = siteConfig.cardDesigns;

  const {
    isMultiSelectMode,
    setIsMultiSelectMode,
    selectedIds,
    setSelectedIds,
  } = useStates();

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleMouseDown = (snippetId: string) => {
    if (isMultiSelectMode) {
      toggleSelected(snippetId);
    }
  };

  const handleLongPress = useLongPress((e, id) => {
    if (isTopPage) {
      // topページの場合は編集不可
      return;
    }
    if (session && !isMultiSelectMode && id.context) {
      setSelectedIds([id.context.toString()]);
    }
    setIsMultiSelectMode(true);
  });

  return (
    <SimpleGrid columns={columns} spacing={4} pb={20}>
      {displayedSnippets.map((snippet: Snippet, idx: number) => {
        const design = cardDesigns[idx % cardDesigns.length];
        return (
          <Link
            key={snippet.id}
            href={`/detail/${snippet.id}`}
            onClick={(e) => {
              if (isMultiSelectMode) {
                e.preventDefault();
              }
            }}
          >
            <Box
              {...handleLongPress(snippet.id)}
              key={snippet.id}
              position="relative"
              height="24vh"
              minHeight="160px"
              maxWidth="360px"
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg={design.bg}
              borderColor={design.borderColor}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="transform 0.2s, background-color 0.3s"
              _hover={{
                transform: "translate(-5px, -5px)",
                boxShadow: design.hoverShadow,
              }}
              onMouseDown={() => handleMouseDown(snippet.id)}
            >
              {isMultiSelectMode && (
                <Checkbox
                  position="absolute"
                  top="2"
                  right="2"
                  pointerEvents="none"
                  isChecked={selectedIds.includes(snippet.id)}
                  onChange={() => toggleSelected(snippet.id)}
                />
              )}
              <div>
                <Heading fontSize="xl" color={design.textColor}>
                  {snippet.function_name_jp || "タイトルなし"}
                </Heading>
                <Text mt={4} fontSize="sm" color={design.textColor}>
                  {snippet.function_description}
                </Text>
              </div>
              <Flex justifyContent="space-between" mb={-2}>
                <Text color={design.textColor}>
                  更新日時: {new Date(snippet.updatedAt).toLocaleDateString()}
                </Text>
                <Box bg="gray.700" px={2} borderRadius="md" color="white">
                  {snippet.used_program_language}
                </Box>
              </Flex>
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
}

export default SnippetCards;
