import { Module } from "vuex";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { RootState } from "../RootState";
import { ExchangeState, IexchangeState } from "./models";

const namespaced = true;

export const state: IexchangeState = new ExchangeState();

export const exchange: Module<IexchangeState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};