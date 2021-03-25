export interface IcommonState {
  isOpeningAside: boolean; //サイドバーが開いているときはtrue
  logInLabel: string;
}

export class CommonState implements IcommonState {
  isOpeningAside = false;
  logInLabel = "ログイン";
}