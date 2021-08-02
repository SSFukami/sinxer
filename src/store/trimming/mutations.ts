import { MutationTree } from "vuex";
import { TrimmingState, ItrimmingState } from "./models";

export const mutations: MutationTree<ItrimmingState> = {
  // 初期化
  init(state: ItrimmingState) {
    Object.assign(state, new TrimmingState());
  },
  setTrimmingState(state: ItrimmingState, payload: boolean): void { //トリミング画面表示の切り替え
    state.isOpeningTrimming = payload;
    state.uploadedImage = "";
  },
  setUploadedImage(state: ItrimmingState, payload: string): void { //アップロードされた画像の変更
    state.uploadedImage = payload;
  },
  setCropImage(state: ItrimmingState, payload: string): void { //トリミングした画像の変更
    state.cropImage = payload;
  },
  setStorageSelfIcon(state: ItrimmingState, payload: string): void { //データベース用の自分のアイコン変更
    state.storageSelfIcon = payload;
  },
  setProfileIcon(state: ItrimmingState, payload: string): void { //プロフィール画面のアイコン
    state.profileIcon = payload;
  },
  setIconList(state: ItrimmingState, payload: string[]): void { //ホーム画面とユーザータブのアイコンのリスト
    state.iconList = payload;
  },
  resetIconList(state: ItrimmingState): void { //ホーム画面とユーザータブのアイコンのリストを0に
    state.iconList.length = 0;
  },
  setSelfIcon(state: ItrimmingState, payload: string): void { //MessageItemの自分のアイコン
    state.selfIcon = payload;
  },
  setClientIcon(state: ItrimmingState, payload: string): void { //MessageItemの話し相手のアイコン
    state.clientIcon = payload;
  },
};