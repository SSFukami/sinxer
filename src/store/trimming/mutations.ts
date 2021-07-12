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
  setIconList(state: ItrimmingState, payload: any): void {//プロフィール画面のアイコン
    state.iconList = payload;
  },
  resetIconList(state: ItrimmingState): void {//プロフィール画面のアイコン
    state.iconList.length = 0;
    // console.log(state.iconList.length);
  },
  setMixerIcon(state: ItrimmingState, payload: string): void {//UserTabのアイコン
    state.mixerIcon = payload;
  },
  setMixerProfileIcon(state: ItrimmingState, payload: string): void {//UserTabのアイコン
    state.mixerProfileIcon = payload;
  },
  setSelfIcon(state: ItrimmingState, payload: string): void {//MessageItemの自分のアイコン
    state.selfIcon = payload;
  },
  setClientIcon(state: ItrimmingState, payload: string): void {//MessageItemの話し相手のアイコン
    state.clientIcon = payload;
  },

};