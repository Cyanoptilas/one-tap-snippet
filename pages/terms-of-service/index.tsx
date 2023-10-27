import Layout from "@/features/components/Layout";
import { Box, Heading, List, ListItem, Text, Link } from "@chakra-ui/react";

const TermsOfService = () => {
  return (
    <Layout>
      <Box bg="gray.50" zIndex={-1}>
        <Box
          p={6}
          maxW="1200px"
          mx="auto"
          borderRadius="md"
          boxShadow="sm"
          py={8}
          px={10}
        >
          <Heading
            as="h1"
            mb={6}
            color="teal.500"
            borderBottom="2px"
            borderColor="teal.500"
            pb={2}
          >
            ONE-TAP-SNIPPET 利用規約
          </Heading>

          <Text mb={4} lineHeight="1.6" color="gray.700">
            この利用規約（以下、「本規約」）は、ONE-TAP-SNIPPET（以下、「当サイト」）が提供するすべてのサービス（以下、「サービス」）の利用条件を定めるものです。ユーザーの皆さま（以下、「ユーザー」）には、本規約に従って、サービスをご利用いただきます。
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第1条（適用）
          </Heading>
          <Text mb={4} ml={2}>
            本規約は、ユーザーと当サイトとの間のサービスの利用に関わる一切の関係に適用されるものとします。ユーザーは、本サービスを利用することで、本規約に同意したものとみなされます。
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第2条（利用登録）
          </Heading>
          <Text mb={4} ml={2}>
            利用登録は、当サイトの所定の登録手続きを通じて行われるものです。当サイトは、利用登録を希望する者の登録を承諾することも、拒否することもできるものとします。
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第3条（ユーザーIDおよびパスワードの管理）
          </Heading>
          <Text mb={4} ml={2}>
            ユーザーは、ユーザーIDおよびパスワードの管理を自己の責任で行うものとします。これらの使用に関して発生するすべての行為及びその結果に関する責任は、ユーザー自身にあります。
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第4条（禁止事項）
          </Heading>
          <Text mb={4} ml={2}>
            ユーザーは、以下の行為を禁じられます。
            <List styleType="disc" stylePosition="inside" ml={5}>
              <ListItem>法令または公序良俗に違反する行為</ListItem>
              <ListItem>犯罪行為に関連する行為</ListItem>
              <ListItem>当サイトのサービスの運営を妨害する行為</ListItem>
              <ListItem>その他、当サイトが不適切と判断する行為</ListItem>
            </List>
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第5条（本サービスの提供の停止等）
          </Heading>
          <Text mb={4} ml={2}>
            当サイトは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全てまたは一部の提供を停止または中断することができます。
            <List styleType="disc" stylePosition="inside" ml={5}>
              <ListItem>
                本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              </ListItem>
              <ListItem>
                地震、落雷、火事、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              </ListItem>
              <ListItem>
                コンピュータまたは通信回線等が事故により停止した場合
              </ListItem>
              <ListItem>
                その他、当サイトが本サービスの提供が困難と判断した場合
              </ListItem>
            </List>
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第6条（著作権）
          </Heading>
          <Text mb={4} ml={2}>
            ユーザーが当サイトのサービスを利用して作成した成果物に関する著作権を含む一切の権利は、当サイトに帰属します。ユーザーはこれらの権利を当サイトに無償で譲渡します。
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第7条（利用制限および登録抹消）
          </Heading>
          <Text mb={4} ml={2}>
            当サイトは、ユーザーが以下のいずれかの事由に該当する場合には、事前の通知なくユーザーの本サービスの利用を制限し、またはユーザーとしての登録を抹消することができます。
            <List styleType="disc" stylePosition="inside" ml={5}>
              <ListItem>本規約のいずれかの条項に違反した場合</ListItem>
              <ListItem>登録事項に虚偽の事実があることが判明した場合</ListItem>
              <ListItem>
                その他、当サイトが本サービスの利用を適当でないと判断した場合
              </ListItem>
            </List>
          </Text>

          <Heading as="h2" size="md" mb={2}>
            第8条（連絡/お問い合わせ）
          </Heading>
          <Text mb={4} ml={2}>
            本規約に関するお問い合わせまたは通知等は、当サイトが別途定める方法により行うものとします。
            <Link href="mailto:shbvxnz1739@gmail.com" color="blue.500">
              shbvxnz1739@gmail.com
            </Link>
            までご連絡ください。
          </Text>

          <Text mt={6} fontStyle="italic">
            以上
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default TermsOfService;
