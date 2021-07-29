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
  setIconList(state: ItrimmingState, payload: string[]): void { //ホーム画面とユーザータブのアイコンのリスト
    state.iconList = payload;
  },
  resetIconList(state: ItrimmingState): void { //ホーム画面とユーザータブのアイコンのリストを0に
    state.iconList.length = 0;
  },
  setProfileIcon(state: ItrimmingState, payload: string): void { //プロフィール画面のアイコン
    state.profileIcon = payload;
  },
  setSelfIcon(state: ItrimmingState, payload: string): void { //MessageItemの自分のアイコン
    state.selfIcon = payload;
  },
  setClientIcon(state: ItrimmingState, payload: string): void { //MessageItemの話し相手のアイコン
    state.clientIcon = payload;
  },
};