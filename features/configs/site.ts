interface siteConfig {
  name: string;
  description: string;
  profileMenu: IMenuItem[];
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
};
