import { useRouter } from "next/router";
import { useEffect } from "react";

type GoogleAdsenseProps = {
  slot: string;
  style?: React.CSSProperties;
  format?: string;
  responsive?: string;
};

export const GoogleAdsense = ({
  slot,
  style = { display: "block" },
  format,
  responsive = "false",
}: GoogleAdsenseProps): JSX.Element => {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      // Pass
    }
  }, [asPath]);

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={style}
        data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
        data-ad-client={`ca-pub-${process.env.PUBLISHER_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};
