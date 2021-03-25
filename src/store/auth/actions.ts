import { ActionTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const actions: ActionTree<IauthState, RootState> = {
  signUp({ dispatch }, payload: { id: string; password: string; jobNumber: number }): void { //新規登録処理
    firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
      .then(user => {
        dispatch("initUserDocument", { user: user.user, jobNumber: payload.jobNumber }); //作成後すぐにdbに追加
        dispatch("setJobState", payload.jobNumber); //vuexに歌い手かmixerか保存

        //成功したらモーダル閉じて編集画面へ
        dispatch("modal/closeModal", null, { root: true });
        router.push('/edit');
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signOut({ dispatch, commit }): void { //ログアウト処理
    firebase.auth().signOut()
      .then(() => {
        commit("init"); //vuexのauth初期化

        //成功したらモーダル閉じてホームへ
        dispatch("modal/closeModal", null, { root: true });
        router.push('/');
      }).catch(error => {
        alert(error.message);
      });
  },
  onAuthChanged({ commit }): void { //認証情報の変更で自動的に書き換え
    firebase.auth().onAuthStateChanged(user => {
      const userData: firebase.User | undefined = user ? user : undefined;
      commit("setUserData", userData);
    });
  },
  async initUserDocument({}, payload: { user: firebase.User; jobNumber: number }): Promise<void> { //dbのコレクションにドキュメント追加
    const job = payload.jobNumber === 0 ? "singers" : "mixers";
    await firebase.firestore().collection(job).doc(payload.user.uid).set({
      uid: payload.user.uid,
    }).then(() => {
      console.log(payload.user);
    });
  },
  setJobState({ commit }, payload: number): void { //歌い手かmixerかを０,1で受け取る
    const singerState = payload === 0 ? true : false;
    commit("setSingerState", singerState);

    const mixerState = !singerState;
    commit("setMixerState", mixerState);
  },
};