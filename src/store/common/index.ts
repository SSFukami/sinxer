import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { CommonState, IcommonState } from "./models";

const namespaced = true;

export const state: IcommonState = new CommonState();

export const common: Module<IcommonState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};
