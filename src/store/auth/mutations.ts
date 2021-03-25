import { MutationTree } from "vuex";
import { AuthState, IauthState } from "./models";

export const mutations: MutationTree<IauthState> = {
    // 初期化
    init(state: IauthState) {
        Object.assign(state, new AuthState());
    },
    setUserData(state: IauthState, payload: object | undefined) { // ユーザー情報変更
        state.user = payload;
    },
    setSingerState(state: IauthState, payload: boolean) { // 認証状態変更
        state.singerState = payload;
    },
    setMixerState(state: IauthState, payload: boolean) { // 認証状態変更
        state.mixerState = payload;
    },
};