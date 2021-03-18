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
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};