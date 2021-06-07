export interface IsingerData {
    name: string;
    detail: string;
    twitter: string;
    link: string;
    [key: string]: string;
}

export const DEFAULT_SINGER_DATA: IsingerData = { //歌い手のデータの初期値(後にiconキー追加)
    name: "お名前",
    detail: "よろしくお願いします。",
    twitter: "@",
    link: "",
}

export interface ImixerData {
    uid?: string;
    name: string;
    detail: string;
    twitter: string;
    fee: number;
    deadline: number;
}

export const DEFAULT_MIXER_DATA: ImixerData = { //Mixerのデータの初期値(後にiconキー追加)
    name: "お名前",
    detail: "よろしくお願いします。",
    twitter: "@",
    fee: 0,
    deadline: 0,
}