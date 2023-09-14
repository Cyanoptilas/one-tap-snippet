import { signOut, useSession } from "next-auth/react";
import Layout from "../../features/ui/Layout";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/react";
import Image from "next/image";
import { MdEmail, MdPerson } from "react-icons/md";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const onDeleteAccount = async () => {
    if (session?.user?.email) {
      try {
        const response = await fetch("/api/account/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user.email }),
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          await router.push({
            pathname: "/",
          });
          signOut();
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        alert("An error occurred while deleting the account.");
      }
    } else {
      alert("Unable to retrieve session information.");
    }
  };

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

          <Button mt={6} colorScheme="red" onClick={() => setIsOpen(true)}>
            アカウント削除
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Account
                </AlertDialogHeader>
                <AlertDialogBody>
                  本当によろしいですか？この操作は後で元に戻すことができません。
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onDeleteAccount} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
