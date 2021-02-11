import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { ModalState, ImodalState } from "./models";

const namespaced = true;

export const state: ImodalState = new ModalState();

export const modal: Module<ImodalState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};
