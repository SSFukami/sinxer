export interface IcommonState {
  isOpeningAside: boolean;
  logInLabel: string;

  searchWord: string | number;
  searchTypeId: number;
}

export class CommonState implements IcommonState {
  isOpeningAside = false; //サイドバーが開いているときはtrue
  logInLabel = "ログイン";

  searchWord = ""; //検索ワード
  searchTypeId = 0; //検索対象のID(0~4)
}