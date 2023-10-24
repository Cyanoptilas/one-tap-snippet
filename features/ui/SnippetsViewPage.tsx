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
import RadioGroupOrder from "@/features/ui/RadioGroupOrder";
import SnippetCards from "@/features/ui/SnippetCards";
import SearchBox from "./SearchBox";
import { AdsCard } from "./ad/AdCard";

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
  favoriteSnippetIds: string[];
}

function SnippetsViewPage(props: SnippetsViewPageProps) {
  const { snippets, favoriteSnippetIds } = props;
  const router = useRouter();
  const { data: session } = useSession();
  const isTopPage: boolean = router.pathname === "/";
  const isFavoritePage: boolean = router.pathname === "/myfavorites";

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>(snippets);

  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const toast = useToast();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const cardsPerPage = useBreakpointValue({ base: 3, md: 6, lg: 9 }) || 3;
  const [breakpoint, setBreakpoint] = useState(cardsPerPage);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (breakpoint !== cardsPerPage) {
      setBreakpoint(cardsPerPage);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsPerPage]);

  const sortedSnippets = [...localSnippets].sort((a, b) => {
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
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "updatedAt":
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      default:
        comparison = 0;
    }

    return order === "asc" ? comparison : -comparison;
  });

  const allFilteredSnippets = sortedSnippets.filter(
    (snippet) =>
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase())
      ) ||
      snippet.used_program_language
        .toLowerCase()
        .includes(searchValue.toLowerCase())
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
    // 詳細ページでタグをクリックして遷移してきた場合にタグをセットする
    const tag = router.query.tag as string | undefined;
    if (tag) {
      setSearchValue(tag);
    }
  }, [router.query.tag]);

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
          height={{ base: "91vh", md: "92vh", lg: "93vh" }}
          minHeight={{ base: "880px", md: "810px", lg: "860px" }}
        >
          <VStack align="center" minHeight="100%">
            {/* 上部操作系表示エリア */}
            <Flex
              justifyContent="space-between"
              width="100%"
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              minHeight={{ base: "80px", md: "70px", lg: "60px" }}
            >
              <Heading
                as="h1"
                size={{ base: "md", md: "lg" }}
                color="blue.600"
                fontFamily="Poppins, sans-serif"
                fontStyle="italic"
                mb={{ base: 4, md: 0 }}
              >
                {isTopPage
                  ? "Snippets"
                  : isFavoritePage
                  ? "My Favorites"
                  : "My Snippets"}
              </Heading>

              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <Flex direction="row" mb={{ base: 2, md: 0 }}>
                  <SearchBox
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </Flex>

                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent={{ base: "flex-end", md: "flex-start" }}
                  width={{ base: "100%", lg: "auto" }}
                >
                  <RadioGroupOrder order={order} setOrder={setOrder} />
                  <SortMenu
                    sort={sort}
                    setSort={setSort}
                    order={order}
                    setPage={setPage}
                  />

                  {session && session.user?.email && (
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
            <SnippetCards
              displayedSnippets={displayedSnippets}
              favoriteSnippetIds={favoriteSnippetIds}
            />

            {/* 広告 */}
            <AdsCard id="51201e20f99cc4fb6ee72cc7bc373783" />
            <AdsCard id="8d595c264fd4df83aaf278d7cbd76db8" />

            {/* 下部ボタンエリア */}
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="90%"
              my={0}
              position="absolute"
              bottom="1%"
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
            <AdsCard id="5cbd60f9cbc041709048511822290814" />

            {isTopPage ? (
              <Tooltip
                label="ログイン後、+ボタンから新規登録画面に行き、スニペットをコピペ&Enterで簡単に登録することができます！"
                fontSize="md"
                placement="auto-start"
                offset={[5, 7]}
                hasArrow
              >
                <IconButton
                  icon={<QuestionOutlineIcon />}
                  isRound
                  aria-label="ヘルプ"
                  position="fixed"
                  bottom={{ base: 9, md: 6 }}
                  right={0}
                  variant="ghost"
                />
              </Tooltip>
            ) : session && isMultiSelectMode ? (
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
                  bottom={{ base: 14, md: 10 }}
                  right={1}
                  variant="ghost"
                  aria-label="カード長押しで削除モードに入る"
                  isRound
                />
              </Tooltip>
            )}
          </VStack>
        </Container>
      </StatesContext.Provider>
    </Layout>
  );
}

export default SnippetsViewPage;
