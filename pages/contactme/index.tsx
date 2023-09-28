import Layout from "../../features/ui/Layout";
import TextareaAutosize from "react-textarea-autosize";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useMail } from "../../features/hooks/useMail";
import { useRef, useState } from "react";
import Router from "next/router";
import CustomDialog, {
  CustomDialogProps,
} from "../../features/ui/CustomDialog";

const ContactMe: React.FC = () => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isSending, setIsSending] = useState(false);
  const { setName, setAddress, setMessage, send } = useMail();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const onClose = (isError: boolean) => {
    setIsOpen(false);
    if (!isError) Router.push("/").then(() => setIsSending(false));
    else setIsSending(false);
  };

  const onSend: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsSending(true);
      const result = await send(); // メール送信処理
      if (!result.success) {
        setDialogTitle("Error");
        setDialogMessage(result.error ?? "Unknown error");
        setIsError(true);
        setIsOpen(true);
        return;
      }
      setDialogTitle("Mail Sent");
      setDialogMessage("Your message has been sent successfully!");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setDialogTitle("Error");
      setDialogMessage("Something is wrong. Back to top page.");
      console.error(error);
    } finally {
      setIsOpen(true);
    }
  };

  const DialogProps: CustomDialogProps = {
    isOpen,
    onClose,
    isError,
    cancelRef,
    dialogTitle,
    dialogMessage,
  };

  return (
    <>
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          height="calc(100vh - 84px)"
          minHeight="520px"
        >
          <Box
            bg="white"
            py={[6, 8, 12]}
            m={[6, 8, 12]}
            rounded="lg"
            width={{ base: 450, md: 600 }}
          >
            <Box maxW="screen-2xl" mx="auto" px={4}>
              <Heading
                as="h2"
                mb={[4, 8]}
                textAlign="center"
                fontSize={["2xl", "3xl"]}
                fontWeight="bold"
                color="gray.800"
              >
                Contact Me
              </Heading>
              <FormControl mb={4}>
                <FormLabel fontSize="sm" fontWeight="bold" color="gray.700">
                  Your Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  focusBorderColor="gray.800"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontSize="sm" fontWeight="bold" color="gray.700">
                  Your Email
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  focusBorderColor="gray.800"
                  placeholder="Your Email"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontSize="sm" fontWeight="bold" color="gray.700">
                  Message
                </FormLabel>
                <Textarea
                  as={TextareaAutosize}
                  minRows={3}
                  name="message"
                  focusBorderColor="gray.800"
                  placeholder="Message"
                  size="md"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="md"
                  width="full"
                  isLoading={isSending}
                  isDisabled={isSending}
                  onClick={onSend}
                >
                  Send
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* メール送信時ダイアログ */}
        <CustomDialog {...DialogProps} />
      </Layout>
    </>
  );
};

export default ContactMe;
