interface IasideMenuList {
    label: string;
    path: string;
    icon: string;
}

export const ASIDE_MENU_LIST: IasideMenuList[] = [
    {
        label: "ホーム",
        path: "/",
        icon: "home-black"
    },
    {
        label: "メッセージ",
        path: "/message",
        icon: "message"
    },
    {
        label: "編集",
        path: "/edit",
        icon: "edit"
    },
]