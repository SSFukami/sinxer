export interface IselectBoxList {
    id: number;
    label: string;
    keyName: string;
    option?: { min?: number; step?: number };
    formType: string;
}

export const HOME_SEARCH_TYPE_LIST: IselectBoxList[] = [
    {
        id: 0,
        label: "名前で検索",
        keyName: "name",
        formType: "TextFieldWhite",
    },
    {
        id: 1,
        label: "料金（円）の上限で検索",
        keyName: "fee",
        option: { min: 0, step: 100 },
        formType: "NumberField",
    },
    {
        id: 2,
        label: "料金（円）の下限で検索",
        keyName: "fee",
        option: { min: 0, step: 100 },
        formType: "NumberField",
    },
    {
        id: 3,
        label: "納期（日数）の上限で検索",
        keyName: "deadline",
        option: { min: 0 },
        formType: "NumberField",
    },
    {
        id: 4,
        label: "納期（日数）の下限で検索",
        keyName: "deadline",
        option: { min: 0 },
        formType: "NumberField",
    },
]