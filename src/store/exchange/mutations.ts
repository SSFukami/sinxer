import { MutationTree } from "vuex";
import { ExchangeState, IexchangeState, profileDataType, messageDataType } from "./models";

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
  setHomeMixerList(state: IexchangeState, payload: profileDataType[]): void { //ホームに表示するMix師のリストの変更
    state.homeMixerList = payload;
    // console.log(state.homeMixerList);
  },
  setClientList(state: IexchangeState, payload: profileDataType[]): void { //チャット相手のリストの変更
    state.clientList = payload;
  },
  setSelectedUid(state: IexchangeState, payload: string): void { //チャットを表示中の相手のユーザーID変更
    state.selectedUid = payload;
  },
  setMessageList(state: IexchangeState, payload: messageDataType[]): void { //チャット相手との会話データのリストの変更
    state.messageList = payload;
  },
  setUnsubscribe(state: IexchangeState, payload: () => void): void { //チャット相手との会話データのリストの変更
    state.unsubscribe = payload;
  },
  getMixerUidList(state: IexchangeState, payload:string[]): void {
    state.homeMixerUidList = payload;
  },
  getClientUidList(state: IexchangeState, payload:string[]): void {
    state.clientUidList = payload;
  }
};