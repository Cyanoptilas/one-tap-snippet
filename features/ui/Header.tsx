import { Box, Flex, Image, Button, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MyMenuList from "./MyMenuList";

const Header = () => {
  const { data: session } = useSession();

  return (
    <Box height="8vh">
      <Flex
        as="nav"
        bg="gray.800"
        px={{ base: 4, md: 6 }}
        pb={-8}
        h={16}
        alignItems="center"
        justify="space-between"
      >
        <Flex alignItems="center">
          <Box as={Link} href="/">
            <Image
              h={{ base: 8, md: 12 }}
              w={{ base: 8, md: 12 }}
              src="/logos/logo.png"
              alt="logo"
              rounded={"3xl"}
            />
          </Box>
        </Flex>
        <Link href="/">
          <Box
            as="a"
            p={{ base: 1, md: 4 }}
            bgGradient="linear(to-r, #eee, #888)"
            borderWidth="2px"
            borderRadius="md"
            borderColor="#333"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            height="8vh"
          >
            <Text
              fontSize={{ base: "md", md: "xl", lg: "2xl" }}
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              One-Tap-Snippet
            </Text>
          </Box>
        </Link>
        {session && session.user ? (
          // ユーザーメニュー
          <Flex justify="center" zIndex="banner">
            <Box display="inline-flex" pr={1} color="white">
              {session.user.image && (
                <MyMenuList imageHref={session.user.image} />
              )}
            </Box>
          </Flex>
        ) : (
          <Link href="/auth/login">
            <Box as="span" ml={3}>
              <Button
                bg="blue.600"
                color="white"
                width={20}
                height={9}
                paddingY={4}
                _hover={{ bg: "blue.300" }}
                _focus={{
                  outlineOffset: "4px",
                  outlineColor: "blue.600",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
