import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box 
      as="footer" 
      bg="gray.800" 
      color="white" 
      py={2} 
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 6 }}
      >
        <Box mb={{ base: 2, md: 0 }}>
          <Link href="/about" color="whiteAlpha.800" mr={4}>
            About
          </Link>
          <Link href="/contactme" color="whiteAlpha.800">
            Contact Me
          </Link>
        </Box>
        <Text fontSize="sm">&copy; {new Date().getFullYear()} one-tap-snippet</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
