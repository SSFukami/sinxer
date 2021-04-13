import { MutationTree } from "vuex";
import { ExchangeState, IexchangeState, profileDataType } from "./models";

export const mutations: MutationTree<IexchangeState> = {
  // 初期化
  init(state: IexchangeState) {
    Object.assign(state, new ExchangeState());
  },
  setSelfProfile(state: IexchangeState, payload: profileDataType): void { //自分のプロフィール情報の変更
    state.selfProfileData = payload;
  },
  setClientProfile(state: IexchangeState, payload: profileDataType): void { //他ユーザーのプロフィール情報の変更
    state.clientProfileData = payload;
  },
  setIsShowingSinger(state: IexchangeState, payload: boolean): void { //歌い手のプロフィールを表示中かどうかのフラッグ変更
    state.isShowingSinger = payload;
  },
  setHomeMixerList(state: IexchangeState, payload: { [key: string]: string }[]): void { //ホームに表示するMix師のリストの変更
    state.homeMixerList = payload;
  },
};