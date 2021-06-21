import { ActionTree } from "vuex";
import { IcommonState } from "./models";
import { RootState } from "../RootState";

export const actions: ActionTree<IcommonState, RootState> = {
  openAside({ commit }): void {
    commit("setAsideState", true);
  },
  closeAside({ commit }): void {
    commit("setAsideState", false);
  },
  changeSearchType({ commit, state }, payload: number): void { //検索モード変更の処理
    commit("setSearchTypeId", payload); //検索モード変更

    const searchWord = state.searchWord;
    if (typeof searchWord === "string" && payload !== 0) { //対象が名前から名前以外になった場合
      commit("setSearchWord", 0); //数字の初期化
    } else if (typeof searchWord === "number" && payload === 0) {//対象が名前以外から名前になった場合
      commit("setSearchWord", ""); //文字列に初期化
    }
  },
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};