import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: (isError: boolean) => void;
  isError: boolean;
  cancelRef: React.RefObject<HTMLButtonElement>;
  dialogTitle: string;
  dialogMessage: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  isError,
  cancelRef,
  dialogTitle,
  dialogMessage,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onClose(isError)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent top="25%">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogTitle}
          </AlertDialogHeader>
          <AlertDialogBody>{dialogMessage}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              colorScheme="blue"
              onClick={() => onClose(isError)}
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomDialog;
