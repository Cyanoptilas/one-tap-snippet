import { getProviders, signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { Box, Heading, Button, Flex, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { error } = useRouter().query;

  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  return (
    <Box py="12" bg="white" height="100vh">
      <Box mx="auto" maxW="screen-2xl" px="4">
        <Heading
          mb="4"
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="gray.800"
        >
          Login
        </Heading>
        {error && (
          <Box
            mx="auto"
            my={4}
            bg="pink.100"
            maxW="lg"
            rounded="lg"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text p="4" color="red.500">
              {error}
              <br />
              {errors[error as keyof typeof errors] ?? errors.default}
            </Text>
          </Box>
        )}
        <Box
          mx="auto"
          maxW="lg"
          bg="white"
          rounded="lg"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Flex flexDir="column" gap="4" p="8">
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <Button
                    key={provider.id}
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: "/",
                      })
                    }
                    bg="gray.900"
                    px="8"
                    py="3"
                    textAlign="center"
                    fontSize="md"
                    fontWeight="semibold"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    _active={{ bg: "gray.600" }}
                    rounded="lg"
                  >
                    Sign in with {provider.name}
                  </Button>
                );
              })}
          </Flex>

          <Flex alignItems="center" justifyContent="center" bg="gray.100" p="4">
            <Text fontSize="sm" color="gray.500" textAlign="center">
              {"Don't have an account?"}
              <Link
                href="https://github.com/"
                target="_blank"
                color="navy"
                _hover={{
                  color: "red",
                  textDecoration: "underline",
                }}
              >
                Register
              </Link>
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const providers = await getProviders().then((res) => {
    return res;
  });

  return {
    props: { providers },
  };
};
