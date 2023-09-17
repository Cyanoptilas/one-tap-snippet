import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      height="4vh"
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "row", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        width="100%"
        px={{ base: 4, md: 6 }}
      >
        <Box>
          <Link href="/contactme" color="whiteAlpha.800">
            Contact Me
          </Link>
        </Box>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} one-tap-snippet
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
