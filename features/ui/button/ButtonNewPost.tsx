import { Box, Button, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdPostAdd } from "react-icons/md";

const ButtonNewPost = () => {
  return (
    <Link href="/register">
      <Box as="span">
        <Button
          bg="blue.600"
          color="white"
          w={14}
          h={14}
          paddingY={2}
          paddingX={4}
          fontSize="sm"
          cursor="pointer"
          position="fixed"
          right={6}
          bottom={6}
          transition={"all .3s ease"}
          _hover={{
            bg: "blue.300",
            w: 28,
            _after: {
              content: "'New Post'",
            },
          }}
          _focus={{
            outlineOffset: "4px",
            outlineColor: "blue.600",
          }}
        >
          <Icon as={MdPostAdd} w={8} h={8} />
        </Button>
      </Box>
    </Link>
  );
};

export default ButtonNewPost;
