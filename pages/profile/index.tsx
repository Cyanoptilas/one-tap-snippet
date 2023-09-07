import { useSession } from "next-auth/react";
import Layout from "../../features/ui/Layout";
import { Box, Heading, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { MdEmail, MdPerson } from "react-icons/md";

const Profile: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <Layout>
      <Box mx="auto" maxW="screen-2xl" px={{ base: 4, md: 8 }}>
        <Heading
          my={{ base: 4, md: 8 }}
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.800"
        >
          Profile
        </Heading>

        <Box
          bg="white"
          mx="auto"
          maxW="lg"
          borderRadius="lg"
          borderWidth="1px"
          boxShadow="lg"
          p={6}
        >
          <VStack spacing={6} alignItems="center">
            <Box borderRadius="full" boxSize="5rem">
              <Box boxSize="80px" borderRadius="full" overflow="hidden">
                {session && session.user ? (
                  session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="profile"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Text>{session.user.name?.charAt(0)}</Text>
                  )
                ) : (
                  <Text>Loading...</Text>
                )}
              </Box>
            </Box>
            <Heading fontSize="xl" fontWeight="bold">
              {session && session.user
                ? session.user.name
                  ? session.user.name
                  : "No Name Provided"
                : "Loading..."}
            </Heading>

            <VStack spacing={4} alignItems="start" w="100%">
              <HStack w="100%" spacing={4}>
                <Icon as={MdPerson} boxSize={6} color="gray.500" />
                <Box w="100%">
                  <Text fontWeight="medium">Name</Text>
                  <Text>
                    {session && session.user
                      ? session.user.name
                        ? session.user.name
                        : "No Name Provided"
                      : "Loading..."}
                  </Text>
                </Box>
              </HStack>
              <HStack w="100%" spacing={4}>
                <Icon as={MdEmail} boxSize={6} color="gray.500" />
                <Box w="100%">
                  <Text fontWeight="medium">Mail Address</Text>
                  <Text>
                    {session && session.user
                      ? session.user.email
                        ? session.user.email
                        : "No Email Provided"
                      : "Loading..."}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
