export interface IcommonState {
  isOpeningAside: boolean; //サイドバーが開いているときはtrue
}

export class CommonState implements IcommonState {
  isOpeningAside = false;
}