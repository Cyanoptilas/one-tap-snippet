import React from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export type Props = React.ComponentProps<"div">;

type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};

declare global {
  var admaxads: AdmaxAdType[];
}

export const AdsCard = (props: Props) => {
  const adMaxId = "51201e20f99cc4fb6ee72cc7bc373783";
  // 親コンポーネントでスタイルを設定できるようにする
  const { className, children, ...newProps } = props;

  const { asPath } = useRouter();

  React.useEffect(() => {
    // 広告配信用のタグを挿入する
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";
    tag.async = true;
    document.body.appendChild(tag);

    try {
      (globalThis.admaxads = window.admaxads || []).push({
        admax_id: adMaxId,
        type: "switch",
      });
    } catch (error) {
      console.error(error);
    }
  }, [asPath]);

  return (
    <Box
      key={asPath}
      display="inline-block"
      data-admax-id={adMaxId}
      {...newProps}
    ></Box>
  );
};
