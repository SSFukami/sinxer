import { MutationTree } from "vuex";
import { CommonState, IcommonState } from "./models";

export const mutations: MutationTree<IcommonState> = {
  // 初期化
  init(state: IcommonState) {
    Object.assign(state, new CommonState());
  },
  setAsideState(state: IcommonState, payload: boolean): void {
    state.isOpeningAside = payload;
  },
  setLogInLabel(state: IcommonState, payload: string): void {
    state.logInLabel = payload;
  },
  setSearchWord(state: IcommonState, payload: string | number): void {
    state.searchWord = payload;
  },
  setSearchTypeId(state: IcommonState, payload: number): void {
    state.searchTypeId = payload;
  },
};