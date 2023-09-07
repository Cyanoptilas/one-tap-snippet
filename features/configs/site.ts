interface siteConfig {
  name: string;
  description: string;
  profileMenu: IMenuItem[];
  cardDesigns: CardDesigns[];
}

export interface IMenuItem {
  id?: string;
  title: string;
  href: string;
}

export interface CardDesigns {
  bg: string;
  borderColor: string;
  hoverShadow: string;
  textColor: string;
}

export const siteConfig: siteConfig = {
  name: "one-tap-snippet",

  description: "コピペ&ボタンクリックでスニペットを簡単に登録するサイト",

  profileMenu: [
    {
      id: "0",
      title: "Profile",
      href: "/profile",
    },
    {
      id: "1",
      title: "My Snippets",
      href: "/mysnippets",
    },
    {
      id: "2",
      title: "Sign Out",
      href: "/",
    },
  ],

  cardDesigns: [
    {
      bg: "gray.800",
      borderColor: "gray.900",
      hoverShadow: "xl",
      textColor: "white",
    },
    {
      bg: "blue.600",
      borderColor: "blue.700",
      hoverShadow: "md",
      textColor: "white",
    },
    {
      bg: "gray.700",
      borderColor: "gray.800",
      hoverShadow: "lg",
      textColor: "white",
    },
    {
      bg: "blue.500",
      borderColor: "blue.600",
      hoverShadow: "sm",
      textColor: "white",
    },
    {
      bg: "gray.600",
      borderColor: "gray.700",
      hoverShadow: "xl",
      textColor: "white",
    },
    {
      bg: "blue.400",
      borderColor: "blue.500",
      hoverShadow: "md",
      textColor: "white",
    },
    {
      bg: "gray.500",
      borderColor: "gray.600",
      hoverShadow: "lg",
      textColor: "white",
    },
    {
      bg: "blue.300",
      borderColor: "blue.400",
      hoverShadow: "sm",
      textColor: "white",
    },
    {
      bg: "gray.400",
      borderColor: "gray.500",
      hoverShadow: "xl",
      textColor: "white",
    },
  ],
};
