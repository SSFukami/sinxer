import { MutationTree } from "vuex";
import { TrimmingState, ItrimmingState } from "./models";

export const mutations: MutationTree<ItrimmingState> = {
  // 初期化
  init(state: ItrimmingState) {
    Object.assign(state, new TrimmingState());
  },
  setTrimmingState(state: ItrimmingState, payload: boolean): void {
    state.isOpeningTrimming = payload;
    state.uploadedImage = "";
  },
  setTrimmingImage(state: ItrimmingState, payload: string): void {
    state.uploadedImage = payload;
  },
  setCropImage(state: ItrimmingState, payload: string): void {
    state.cropImage = payload;
  },
  setStorageSelfIcon(state: ItrimmingState, payload: string): void {
    state.storageSelfIcon = payload;
  },
  setMixerCropImage(state: ItrimmingState, payload: string): void {
    state.mixerCropImage = payload;
  },
};