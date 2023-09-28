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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <Loading isOpen={isOpen} onClose={onClose} />;
  }
  return (
    <Box minWidth="360px">
      <Header />
      <Box flex="1" display="flex" flexDirection="column">
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
