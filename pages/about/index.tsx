import React from "react";
import Layout from "../../features/ui/Layout";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

const About = () => {
  return (
    <Layout>
      <Box maxW="screen-xl" mx="auto" p={8} bg="white" borderRadius="md">
        <Heading as="h1" mb={4} color="gray.700">
          このウェブサイトについて
        </Heading>
        <Text mb={4}>
          このウェブサイトは、ユニークな機能と洞察を紹介するために作成された個人開発プロジェクトです。このプロジェクトの目的は、ユーザーにシームレスで豊かな体験を提供することです。
        </Text>

        <Heading as="h2" mb={4} size="lg" color="gray.700">
          私について
        </Heading>
        <Text mb={4}>
          私の名前は[あなたの名前]で、[あなたの経歴]の背景を持つ熱心な開発者です。[あなたの専門分野]に焦点を当てたさまざまなプロジェクトに取り組んでいます。
        </Text>

        <Heading as="h2" mb={4} size="lg" color="gray.700">
          使用技術
        </Heading>
        <Text mb={4}>
          このウェブサイトは、React、Chakra
          UI、Next.jsなどの現代的な技術を使用して構築されました。目標は、高速でレスポンシブかつユーザーフレンドリーなウェブサイトを作成することでした。
        </Text>

        <Heading as="h2" mb={4} size="lg" color="gray.700">
          お問い合わせ
        </Heading>
        <Text mb={4}>
          以下のプラットフォームのいずれかを通じてお気軽にご連絡ください:
        </Text>
        <Text mb={2}>
          <Link
            href="https://github.com/[あなたのGitHub]"
            isExternal
            color="blue.500"
          >
            GitHub
          </Link>
        </Text>
        <Text mb={2}>
          <Link
            href="https://twitter.com/[あなたのTwitter]"
            isExternal
            color="blue.500"
          >
            Twitter
          </Link>
        </Text>
        <Text>
          <Link href="mailto:[あなたのメール]" isExternal color="blue.500">
            メール
          </Link>
        </Text>
      </Box>
    </Layout>
  );
};

export default About;
