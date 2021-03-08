import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { AuthState, IauthState } from "./models";

const namespaced = true;

export const state: IauthState = new AuthState();

export const auth: Module<IauthState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};