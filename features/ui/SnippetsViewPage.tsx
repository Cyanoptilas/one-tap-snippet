import {
  Container,
  Heading,
  Button,
  VStack,
  Flex,
  useBreakpointValue,
  Center,
  useToast,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "@/features/ui/Layout";
import {
  AddIcon,
  CloseIcon,
  DeleteIcon,
  QuestionOutlineIcon,
} from "@chakra-ui/icons";
import SortMenu from "@/features/ui/SortMenu";
import SearchBoxTag from "@/features/ui/SearchBoxTag";
import RadioGroupOrder from "@/features/ui/RadioGroupOrder";
import SnippetCards from "@/features/ui/SnippetCards";
import SearchBoxLanguage from "@/features/ui/SearchBoxLanguage";

interface StatesContextProps {
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: Dispatch<SetStateAction<boolean>>;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const StatesContext = createContext<StatesContextProps>({
  isMultiSelectMode: false,
  setIsMultiSelectMode: () => undefined,
  selectedIds: [],
  setSelectedIds: () => undefined,
});

export const useStates = () => {
  return useContext(StatesContext);
};

export interface Snippet {
  id: string;
  used_program_language: string;
  function_name_jp: string;
  function_name_en: string;
  function_description: string;
  tags: string[];
  code: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

interface SnippetsViewPageProps {
  snippets: Snippet[];
}

function SnippetsViewPage({ snippets }: SnippetsViewPageProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isTopPage: boolean = router.pathname === "/";

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>(snippets);

  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toast = useToast();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const cardsPerPage = useBreakpointValue({ base: 5, md: 8, lg: 9 }) || 5;
  const [searchLanguage, setSearchLanguage] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const sortedSnippets = localSnippets.sort((a, b) => {
    let comparison = 0;
    switch (sort) {
      case "title":
        comparison = (a.function_name_jp || "タイトルなし").localeCompare(
          b.function_name_jp || "タイトルなし"
        );
        break;
      case "language":
        comparison = a.used_program_language.localeCompare(
          b.used_program_language
        );
        break;
      case "createdAt":
        comparison =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        break;
      case "updatedAt":
        comparison =
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        break;
      default:
        comparison = 0;
    }
    return order === "asc" ? comparison : -comparison;
  });

  const allFilteredSnippets = sortedSnippets.filter(
    (snippet) =>
      (!searchTag ||
        snippet.tags.some((tag) =>
          tag.toLowerCase().startsWith(searchTag.toLowerCase())
        )) &&
      (!searchLanguage ||
        snippet.used_program_language
          .toLowerCase()
          .includes(searchLanguage.toLowerCase()))
  );

  const displayedSnippets = allFilteredSnippets.slice(
    page * cardsPerPage,
    (page + 1) * cardsPerPage
  );

  const totalPages = Math.ceil(allFilteredSnippets.length / cardsPerPage);

  const ContextProps = {
    isMultiSelectMode,
    setIsMultiSelectMode,
    selectedIds,
    setSelectedIds,
  };

  useEffect(() => {
    // ページ更新時
    const handleRouteChange = () => {
      setSearchLanguage(""); // 言語の検索ボックスをクリア
      setSearchTag(""); // タグの検索ボックスをクリア
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // クリーンアップ関数
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    // 詳細ページでタグをクリックして遷移してきた場合にタグをセットする
    const tag = router.query.tag as string | undefined;
    if (tag) {
      setSearchTag(tag);
    }
  }, []);

  const deleteSelectedSnippets = async () => {
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        const newSnippets = snippets.filter(
          (snippet) => !selectedIds.includes(snippet.id)
        );

        setLocalSnippets(newSnippets);

        setSelectedIds([]);
        toast({
          title: "Snippets deleted.",
          description: "The selected snippets have been deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsMultiSelectMode(false);
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete snippets.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setSelectedIds([]);
    setIsMultiSelectMode(false);
  };

  return (
    <Layout>
      <StatesContext.Provider value={ContextProps}>
        <Container
          maxW="6xl"
          pt={2}
          position="relative"
          height="calc(100vh - 70px)"
        >
          <VStack align="center" height="100%">
            {/* ヘッダー表示エリア */}
            <Flex
              justifyContent="space-between"
              width="100%"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              pb={2}
            >
              <Heading
                as="h1"
                size={{ base: "md", md: "xl" }}
                color="blue.600"
                fontFamily="Poppins, sans-serif"
                fontStyle="italic"
                mb={{ base: 4, md: 0 }}
              >
                {isTopPage ? "Snippets" : "My Snippets"}
              </Heading>
              <Flex
                direction={{ base: "column", lg: "row" }}
                alignItems="center"
              >
                <Flex direction="row">
                  <SearchBoxLanguage
                    searchLanguage={searchLanguage}
                    setSearchLanguage={setSearchLanguage}
                  />
                  <SearchBoxTag
                    searchTag={searchTag}
                    setSearchTag={setSearchTag}
                  />
                </Flex>

                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent={{ base: "flex-end", lg: "flex-start" }}
                  width={{ base: "100%", lg: "auto" }}
                >
                  <RadioGroupOrder order={order} setOrder={setOrder} />
                  <SortMenu
                    sort={sort}
                    setSort={setSort}
                    order={order}
                    setPage={setPage}
                  />

                  {session && (
                    <Link href="/register">
                      <IconButton
                        icon={<AddIcon />}
                        colorScheme="blue"
                        ml={4}
                        aria-label="新規投稿"
                      />
                    </Link>
                  )}
                </Flex>
              </Flex>
            </Flex>

            {/* カード表示エリア */}
            <SnippetCards displayedSnippets={displayedSnippets} />

            {/* 下部ボタンエリア */}
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="90%"
              mt={4}
              position="fixed"
              bottom="3%"
            >
              <Button
                onClick={() => setPage(page - 1)}
                isDisabled={page === 0}
                colorScheme="blue"
                mr={2}
              >
                前のページ
              </Button>
              {isSmallScreen ? (
                <Center
                  w="50px"
                  h="30px"
                  bg="blue.500"
                  color="white"
                  borderRadius="md"
                >
                  {page + 1}
                </Center>
              ) : (
                Array.from({ length: totalPages }).map((_, idx) => (
                  <Center
                    key={idx}
                    w="45px"
                    h="30px"
                    bg={page === idx ? "blue.500" : "gray.100"}
                    color={page === idx ? "white" : "black"}
                    borderRadius="md"
                    mx={1}
                    cursor="pointer"
                    onClick={() => setPage(idx)}
                  >
                    {idx + 1}
                  </Center>
                ))
              )}
              <Button
                onClick={() => setPage(page + 1)}
                isDisabled={page + 1 >= totalPages}
                colorScheme="blue"
                ml={2}
              >
                次のページ
              </Button>
            </Flex>
            {!isTopPage &&
              (session && isMultiSelectMode ? (
                <Flex
                  position="fixed"
                  right={{ base: 1, md: 4 }}
                  bottom={4}
                  zIndex={10}
                >
                  <Tooltip label="Delete selected snippets" hasArrow>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={deleteSelectedSnippets}
                      mr={2}
                      aria-label="Delete selected snippets"
                      isRound
                      isDisabled={selectedIds.length === 0}
                    />
                  </Tooltip>
                  <Tooltip label="Exit multi-select mode" hasArrow>
                    <IconButton
                      icon={<CloseIcon />}
                      onClick={() => setIsMultiSelectMode(false)}
                      aria-label="Exit multi-select mode"
                      isRound
                    />
                  </Tooltip>
                </Flex>
              ) : (
                <Tooltip label="カード長押しで削除モードに入る" hasArrow>
                  <IconButton
                    icon={<QuestionOutlineIcon />}
                    position="fixed"
                    bottom={4}
                    right={4}
                    variant="ghost"
                    aria-label="カード長押しで削除モードに入る"
                    isRound
                  />
                </Tooltip>
              ))}
          </VStack>
        </Container>
      </StatesContext.Provider>
    </Layout>
  );
}

export default SnippetsViewPage;
