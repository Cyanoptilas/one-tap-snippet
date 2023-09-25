import {
  Box,
  Container,
  Heading,
  Tag,
  TagLabel,
  Text,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Flex,
  HStack,
  IconButton,
  Alert,
  AlertIcon,
  VStack,
  useDisclosure,
  InputRightElement,
  InputGroup,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import MarkdownDisplay from "@/features/ui/MarkdownDisplay";
import Loading from "@/features/ui/Loading";
import { useSession } from "next-auth/react";
import GoogleAdsense from "./adsence/GoogleAdsense";

export interface SnippetDetailData {
  id: string;
  used_program_language?: string;
  function_name_jp?: string;
  function_name_en?: string;
  function_description?: string;
  tags: string[];
  code: string;
  markdownCode: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { name: string; email: string };
  authorId?: string;
}

type UpdatedData = {
  id: string;
  used_program_language?: string;
  function_name_jp?: string;
  function_description?: string;
  tags: string[];
};

function DetailPage({ snippet }: { snippet: SnippetDetailData }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState<SnippetDetailData | null>(snippet);
  const [originalData, setOriginalData] = useState<SnippetDetailData | null>(
    snippet
  ); // 修正前のデータを保持
  const [selectedTag] = useState<string | null>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(snippet.tags);
  const [isTagAdded, setIsTagAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const tagInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;

  const authorName = data?.author?.name ?? "NoName";

  useEffect(() => {
    if (isTagAdded) {
      const currentTagInputRef = tagInputRefs.current[tags.length - 1];

      if (currentTagInputRef) {
        currentTagInputRef.focus(); // タグ入力欄追加時にフォーカスする
      }

      // 新しいタグの追加後、isTagAddedをfalseにリセット
      setIsTagAdded(false);
    }
  }, [tags, isTagAdded]);

  if (!data) {
    return <Loading isOpen={isOpen} onClose={onClose} />;
  }

  const handleTagClick = (tag: string) => {
    // タグをクリックで、指定のタグで検索実行
    router.push({
      pathname: "/",
      query: { tag },
    });
  };

  const handleEditClick = () => {
    setOriginalData(data);
    setIsEditing(true);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
    tagInputRefs.current.push(null);
    setIsTagAdded(true);
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const handleCancelClick = () => {
    setData(originalData);
    setTags(originalData!.tags);
    setError(null);
    setIsEditing(false);
  };

  const handleUpdateClick = async () => {
    setIsLoading(true);

    // バリデーション
    if (tags.some((tag) => tag.trim() === "")) {
      setError("空のタグ入力欄があります。");
      setIsLoading(false);
      return;
    }

    if (!data) {
      alert("更新中に失敗しました。(No data)");
      return;
    }

    try {
      const updatedData: UpdatedData = {
        id: data.id,
        tags: tags,
      };

      updatedData.function_name_jp = data.function_name_jp;
      updatedData.function_description = data.function_description;
      updatedData.used_program_language = data.used_program_language;

      const response = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        setData({
          code: data.code,
          markdownCode:
            `\`\`\`${data!.used_program_language!.toLowerCase()}\n` +
            data!.code +
            `\n\`\`\``,
          ...updatedData,
        });
        setTags(updatedData.tags);
        toast({
          title: "更新完了",
          description: "データが正常に更新されました！",
          status: "success",
          duration: 3000,
        });
      } else {
        alert(result.error || "更新中に失敗しました。");
      }
    } catch (error) {
      alert("更新中にエラーが発生しました。" + `\n` + error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <Container maxW="3xl" minWidth="sm" minHeight="91vh" centerContent py="4">
      <Flex mb="4" width="100%">
        <Button
          onClick={() => router.push("/")}
          colorScheme="blue"
          variant="outline"
          size="sm"
          mr={4}
        >
          一覧に戻る
        </Button>
      </Flex>
      <Box
        bg="white"
        p="6"
        shadow="xl"
        borderRadius="md"
        w="full"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb="4">
          <VStack alignItems="start">
            <Heading as="h1" size="lg">
              コードサマリー
            </Heading>
            <Text fontSize="sm">Created By: {authorName}</Text>
          </VStack>
          {!isEditing &&
            data!.author &&
            session?.user?.email === data!.author.email && (
              <Button onClick={handleEditClick}>修正</Button>
            )}
        </Flex>

        {isEditing ? (
          // 編集時フォーム
          <Box>
            <FormControl>
              <FormLabel>関数名</FormLabel>
              <Input
                value={data.function_name_jp}
                onChange={(e) =>
                  setData((state) =>
                    state
                      ? { ...state, function_name_jp: e.target.value }
                      : state
                  )
                }
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>関数の説明</FormLabel>
              <Textarea
                value={data.function_description}
                onChange={(e) =>
                  setData((state) =>
                    state
                      ? { ...state, function_description: e.target.value }
                      : state
                  )
                }
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>プログラミング言語</FormLabel>
              <Input
                value={data.used_program_language}
                onChange={(e) =>
                  setData((state) =>
                    state
                      ? { ...state, used_program_language: e.target.value }
                      : state
                  )
                }
              />
            </FormControl>
            {tags.map((tag, index) => {
              if (index % columns === 0) {
                return (
                  <HStack key={index} spacing={2} my={4} width="100%">
                    {tags
                      .slice(index, index + columns)
                      .map((innerTag, innerIndex) => (
                        <InputGroup
                          key={innerIndex}
                          width={`${100 / columns}%`}
                        >
                          <Input
                            ref={(el) =>
                              (tagInputRefs.current[index + innerIndex] = el)
                            } // 各テキストボックスに参照を設定
                            value={innerTag}
                            onChange={(e) =>
                              handleTagChange(e, index + innerIndex)
                            }
                            placeholder="タグを入力"
                          />
                          <InputRightElement width="fit-content">
                            <IconButton
                              icon={<MinusIcon />}
                              onClick={() =>
                                handleRemoveTag(index + innerIndex)
                              }
                              aria-label="タグを削除"
                              size="sm"
                              mr={1}
                            />
                          </InputRightElement>
                        </InputGroup>
                      ))}
                  </HStack>
                );
              }
              return null;
            })}
            <VStack align="start" py={2}>
              <Button leftIcon={<AddIcon />} onClick={handleAddTag}>
                タグを追加
              </Button>
              {error && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <HStack>
                <Button
                  mt="4"
                  colorScheme="blue"
                  onClick={handleUpdateClick}
                  isLoading={isLoading}
                >
                  更新
                </Button>
                <Button mt="4" colorScheme="red" onClick={handleCancelClick}>
                  キャンセル
                </Button>
              </HStack>
            </VStack>
          </Box>
        ) : (
          // 詳細ビュー
          <>
            <Box
              bg="gray.100"
              p="4"
              borderRadius="md"
              mb="4"
              borderColor="gray.300"
              borderWidth="1px"
              position="relative"
              shadow="md"
            >
              <Box
                position="absolute"
                top="2"
                right="2"
                bg="blue.500"
                color="white"
                borderRadius="md"
                px="2"
                py="1"
                fontSize="sm"
              >
                {data.used_program_language}
              </Box>
              <Heading as="h2" size="md" mb="2" width="88%">
                {data.function_name_jp}
              </Heading>
              <Text>{data.function_description}</Text>
              <Box mt="2">
                {tags.map((tag, tagIndex) => (
                  <Tag
                    key={tagIndex}
                    size="sm"
                    mr="1"
                    cursor="pointer"
                    onClick={() => handleTagClick(tag)}
                    colorScheme={tag === selectedTag ? "blue" : "gray"}
                    _hover={{ color: "white", bg: "blue.500" }}
                    borderRadius="full"
                  >
                    <TagLabel>{`#${tag}`}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </Box>

            <Box fontSize={14}>
              <MarkdownDisplay content={data.markdownCode} />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
