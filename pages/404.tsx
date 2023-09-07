import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const PageNotFound: React.FC = () => {
  return (
    <Box py={[6, 8, 12]}>
      <Box mx="auto" maxW="screen-2xl" px={[4, 8]}>
        <Box
          position="relative"
          mx="auto"
          flex="1"
          h="96"
          w={{ base: "full", sm: "96" }}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          borderRadius="lg"
          bg="gray.100"
          shadow="lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?auto=format&q=75&fit=crop&w=600"
            alt="Photo"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={[8, 16]}
          >
            <Heading
              mb={2}
              textAlign="center"
              fontSize={["2xl", "3xl", "4xl"]}
              fontWeight="bold"
              color="white"
            >
              404
            </Heading>

            <Text
              mb={8}
              textAlign="center"
              color="gray.200"
              fontSize={["md", "lg"]}
            >
              The page you’re looking for doesn’t exist.
            </Text>

            <Link href="/" passHref>
              <Box
                display="inline-block"
                borderRadius="lg"
                bg="gray.200"
                px={8}
                py={3}
                textAlign="center"
                fontSize={["sm", "md"]}
                fontWeight="semibold"
                color="gray.500"
                outline="none"
                _hover={{ bg: "gray.300" }}
                _active={{ color: "gray.700" }}
              >
                Go home
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageNotFound;
