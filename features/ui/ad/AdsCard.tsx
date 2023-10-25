import React from "react";
import { useRouter } from "next/router";

export type Props = React.ComponentProps<"div">;

type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};

declare global {
  var admaxads: AdmaxAdType[];
}

export const AdsCard = (props: Props) => {
  const adMaxId = props.id;
  // 親コンポーネントでスタイルを設定できるようにする

  const { asPath } = useRouter();

  React.useEffect(() => {
    // 広告配信用のタグを挿入する
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";
    tag.async = true;
    document.body.appendChild(tag);

    try {
      (globalThis.admaxads = window.admaxads || []).push({
        admax_id: adMaxId!,
        type: "switch",
      });
    } catch (error) {
      console.error(error);
    }
  }, [asPath]);

  // スタイルはTailwindを使うことを前提としている
  return (
    <div
      key={asPath}
      className="admax-switch"
      //   className={clsx("admax-switch inline-block", className)}
      data-admax-id={adMaxId}
    ></div>
  );
};
