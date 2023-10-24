import { useState } from "react";
import {
  Box,
  Textarea,
  Button,
  VStack,
  Spinner,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import "highlight.js/styles/vs2015.css";
import { useRouter } from "next/router";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Layout from "@/features/ui/Layout";
import { useSession } from "next-auth/react";
import Script from "next/script";
import { AdsCard } from "@/features/ui/ad/AdCard";

const Home = () => {
  const { data: session } = useSession();
  const [snippet, setSnippet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSnippetChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSnippet(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && snippet.trim() !== "") {
      // Shiftキーを押しながらEnterを押した場合は除外
      e.preventDefault(); // デフォルトのEnterキーの動作を防ぐ
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = `
      下記の処理について、指定のフォーマットのJSON形式で回答お願いします。データに質問文は不要です。
      プログラミングなどの処理になっていない文字列の場合は、"function_name"にエラーと返してください。
      {
        "function_name_jp": "処理名 日本語で",
        "function_name_en": "処理名 英語で",
        "function_description": "日本語の処理概要",
        "function_keywords": "処理概要のキーワードの配列",
        "used_program_language": "使用されているプログラミング言語の英語名称",
        "used_frameworks": "使用されているフレームワークの配列",
        "used_techs": "その他に使用されているフレームワーク・ライブラリ・パッケージ・技術などの名称の配列",
      }

      ${snippet}
    `;

    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: payload }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const answer = JSON.parse(data.choices[0].message.content);

      // DBへの登録処理
      const dbResponse = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...answer,
          code: snippet,
          tags: [
            ...(answer.function_keywords || []),
            ...(answer.used_frameworks || []),
            ...(answer.used_techs || []),
          ],
          author: { name: session?.user?.name, email: session?.user?.email },
        }),
      });

      if (!dbResponse.ok) {
        throw new Error("Failed to save to DB");
      }

      const savedData = await dbResponse.json();

      await router.push({
        pathname: "/result",
        query: { data: JSON.stringify(savedData) },
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error handleSubmit:", error);
      setIsErrorModalOpen(true);
    }
  };

  const bg = useColorModeValue("gray.50", "gray.700");
  const color = useColorModeValue("gray.800", "gray.200");

  const closeModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <Layout>
      <VStack
        spacing={2}
        paddingX={4}
        mt={1}
        minHeight="92vh"
        bg={bg}
        color={color}
        justifyContent="center"
      >
        <Box
          w={{ base: "90%", md: "70%" }}
          minWidth={400}
          maxWidth={800}
          p={2}
          borderRadius="md"
          bg="green.200"
        >
          <Text fontSize="sm">
            ChatGPTを利用し、スニペットのサマリーを自動生成します。
            <br />
            登録結果画面で処理名、処理説明、タグの修正を行なえます。
          </Text>
        </Box>
        <AdsCard />
        <Box
          bg="white"
          p={2}
          shadow="md"
          borderRadius="md"
          width={{ base: "90%", md: "70%" }}
          minWidth={400}
          maxWidth={800}
          borderWidth="1px"
          borderColor="gray.200"
          transition="width 0.3s ease-in-out"
        >
          <Textarea
            value={snippet}
            onChange={handleSnippetChange}
            onKeyPress={handleKeyPress}
            placeholder="スニペットをこちらに貼り付けてください"
            h="70vh"
            size="lg"
            borderRadius="md"
            boxShadow="md"
            mb="4"
            fontSize="sm"
            autoFocus
          />
          <Tooltip
            label="Enterキーを押して送信"
            aria-label="Enterキーのツールチップ"
          >
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="問い合わせ中"
              size="lg"
              colorScheme="blue"
              boxShadow="md"
            >
              {isLoading ? <Spinner /> : "登録 (Enterキーで送信)"}
            </Button>
          </Tooltip>
        </Box>

        {/* エラーモーダル */}
        <Modal isOpen={isErrorModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>エラー</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              データの保存中にエラーが発生しました。再度お試しください。
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                閉じる
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Layout>
  );
};

export default Home;
