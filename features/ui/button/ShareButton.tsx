import { HStack, IconButton, useToast } from "@chakra-ui/react";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { FaClipboard } from "react-icons/fa";

interface ShareButtonProps {
  url?: string;
  title?: string;
}

const buttonSize: number = 30;

const ShareButton: React.FC<ShareButtonProps> = ({
  url = "https://one-tap-snippet.vercel.app/",
  title = "コピペするだけでスニペットを簡単登録！",
}) => {
  const toast = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${title}\n${url}`);
    toast({
      title: "クリップボードにコピーしました！",
      duration: 2000,
      isClosable: true,
      status: "success",
    });
  };

  return (
    <HStack spacing={2} py={2}>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={buttonSize} round />
      </TwitterShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon size={buttonSize} round />
      </LineShareButton>
      <HatenaShareButton
        url={url}
        title={title}
        windowWidth={660}
        windowHeight={460}
      >
        <HatenaIcon size={buttonSize} round />
      </HatenaShareButton>
      <EmailShareButton url={url} title={title}>
        <EmailIcon size={buttonSize} round />
      </EmailShareButton>
      <IconButton
        aria-label="Copy to clipboard"
        icon={<FaClipboard />}
        isRound
        size="sm"
        onClick={handleCopyToClipboard}
      />
    </HStack>
  );
};

export default ShareButton;
