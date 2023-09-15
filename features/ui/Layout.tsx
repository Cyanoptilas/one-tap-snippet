import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import { Box, useDisclosure } from "@chakra-ui/react";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  if (status === "loading") {
    return <Loading isOpen={isOpen} onClose={onClose} />;
  }
  return (
    <>
      <Header />
      <Box flex="1" display="flex" flexDirection="column" minHeight="88vh">
        {props.children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
