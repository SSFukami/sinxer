import { MutationTree } from "vuex";
import { CommonState, IcommonState } from "./models";

export const mutations: MutationTree<IcommonState> = {
  // 初期化
  init(state: IcommonState) {
    Object.assign(state, new CommonState());
  },
  shiftAside(state: IcommonState, payload: boolean) {
    state.isOpeningAside = payload;
  },
};
