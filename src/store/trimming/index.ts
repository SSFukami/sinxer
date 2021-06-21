import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { TrimmingState, ItrimmingState } from "./models";

const namespaced = true;

export const state: ItrimmingState = new TrimmingState();

export const trimming: Module<ItrimmingState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};