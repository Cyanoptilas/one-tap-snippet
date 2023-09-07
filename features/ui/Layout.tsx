import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import { useSession } from "next-auth/react";
import Loading from "./Loading";
import { Box, useDisclosure } from "@chakra-ui/react";

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
      <Box>{props.children}</Box>
    </>
  );
};

export default Layout;
