import React from "react";
import { CircularProgress, Flex, Modal, ModalOverlay } from "@chakra-ui/react";

const Loading = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Flex height="100vh" justifyContent="center" alignItems="center">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
            zIndex={0}
          />
          <CircularProgress isIndeterminate color="blue.300" />
        </Flex>
      </Modal>
    </>
  );
};

export default Loading;
