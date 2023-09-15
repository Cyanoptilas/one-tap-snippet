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
import { Snippet, useStates } from "./SnippetsViewPage";
import { useRouter } from "next/router";
import { FaRegClock, FaRedoAlt, FaHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import CustomDialog from "./CustomDialog";

export interface SnippetCardsProps {
  displayedSnippets: Snippet[];
  favoriteSnippetIds: string[];
}

function SnippetCards(props: SnippetCardsProps) {
  const { displayedSnippets, favoriteSnippetIds } = props;
  const router = useRouter();
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>(favoriteSnippetIds);

  const isTopPage: boolean = router.pathname === "/";
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const {
    isMultiSelectMode,
    setIsMultiSelectMode,
    selectedIds,
    setSelectedIds,
  } = useStates();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const cancelRef = useRef(null);

  useEffect(() => {}, []);

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

  const toggleFavorite = async (id: string) => {
    if (session) {
      try {
        // お気に入り登録・削除処理
        const response = await fetch(`/api/favorite/toggle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session!.user!.email,
            snippetId: id,
          }),
        });

        const result = await response.json();

        if (result && result.updatedFavorites) {
          setFavorites(result.updatedFavorites);
        } else {
          setDialogMessage("API response does not contain updatedFavorites");
          setIsDialogOpen(true);
        }
      } catch (error: unknown) {
        setDialogMessage("お気に入りのトグルに失敗しました: " + String(error));
        setIsDialogOpen(true);
      }
    }
  };

  return (
    <SimpleGrid columns={columns} spacing={2} pb={{ base: 14, lg: 0 }}>
      {displayedSnippets.map((snippet: Snippet) => {
        const design = {
          bg: "gray.50",
          borderColor: "gray.200",
          hoverShadow: "xl",
          textColor: "gray.700",
        };

        const tagsToShow = snippet.tags
          .slice(0, 3)
          .filter((tag: string, index: number, arr: string[]) => {
            const accumulatedLength = arr
              .slice(0, index + 1)
              .reduce((acc: number, tag: string) => acc + tag.length, 0);
            return accumulatedLength < 19;
          });

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
              minHeight="150px"
              maxWidth="360px"
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg={design.bg}
              borderColor={design.borderColor}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="transform 0.2s, box-shadow 0.3s"
              _hover={{
                transform: "translateY(-5px)",
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
              {!isMultiSelectMode && (
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(snippet.id);
                  }}
                >
                  {session && (
                    <FaHeart
                      color={
                        favorites &&
                        Array.isArray(favorites) &&
                        favorites.includes(snippet.id)
                          ? "red"
                          : "gray"
                      }
                      size="1.5em"
                    />
                  )}
                  {isMultiSelectMode && "true"}
                </Box>
              )}
              <Box>
                <Heading
                  fontSize="xl"
                  color={design.textColor}
                  maxWidth="290px"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {snippet.function_name_jp || "タイトルなし"}
                </Heading>
                <Text mt={4} fontSize="sm" color={design.textColor}>
                  {snippet.function_description}
                </Text>
              </Box>

              <Flex flexDirection="column" mb={-2}>
                <Flex flexWrap="wrap" maxWidth="300px">
                  {tagsToShow.map((tag: string, index: number) => (
                    <Text
                      key={index}
                      color={design.textColor}
                      fontSize="sm"
                      mr={2}
                    >
                      #{tag}
                    </Text>
                  ))}
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" mt={2}>
                  <Flex alignItems="center">
                    <FaRegClock color={design.bg} size="0.8em" />
                    <Text ml={2} color={design.textColor} fontSize="sm">
                      {new Date(snippet.createdAt).toLocaleDateString()}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <FaRedoAlt color={design.bg} size="0.8em" />
                    <Text ml={2} color={design.textColor} fontSize="sm">
                      {new Date(snippet.updatedAt).toLocaleDateString()}
                    </Text>
                  </Flex>
                  <Box
                    bg="gray.700"
                    px={2}
                    borderRadius="md"
                    color="white"
                    fontSize="sm"
                  >
                    {snippet.used_program_language}
                  </Box>
                </Flex>
              </Flex>
              <CustomDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                isError={true}
                cancelRef={cancelRef}
                dialogTitle="エラー"
                dialogMessage={dialogMessage}
              />
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
}

export default SnippetCards;
