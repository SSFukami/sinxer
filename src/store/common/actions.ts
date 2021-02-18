import { ActionTree } from "vuex";
import { IcommonState } from "./models";
import { RootState } from "../RootState";

export const actions: ActionTree<IcommonState, RootState> = {
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};
