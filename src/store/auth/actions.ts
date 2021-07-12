import { ActionTree } from "vuex";
import { IauthState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  DEFAULT_SINGER_DATA, DEFAULT_MIXER_DATA
} from "@/mixins/defaultProfileData";

export const actions: ActionTree<IauthState, RootState> = {
  signUp({ dispatch }, payload: { id: string; password: string; jobNumber: number }): void { //新規登録処理
    firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
      .then(async user => {
        dispatch("initUserDocument", { user: user.user, jobNumber: payload.jobNumber }); //作成後すぐにdbに追加
        await dispatch("setJobState", payload.jobNumber); //vuexに歌い手かmixerか保存

        dispatch("trimming/createDefaultIcon", null ,{root: true});//デフォルトのアイコンを作成

        //成功したらモーダル閉じて編集画面へ
        dispatch("modal/closeModal", null, { root: true });
        router.push('/edit');
      })
      .catch(error => {
        alert(error.message);
      });
  },
  signIn({ dispatch }, payload: { id: string; password: string; jobNumber: number }): void { //サインイン処理
    firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)
      .then(() => {
        dispatch("setJobState", payload.jobNumber); //vuexに歌い手かmixerか保存
        //成功したらモーダル閉じてホーム画面へ
        dispatch("modal/closeModal", null, { root: true });
        //第３引数に{ root: true }を書かなきゃダメ
        router.push('/');
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
  onAuthChanged(context): void { //認証情報の変更で自動的に書き換え
    firebase.auth().onAuthStateChanged(user => {
      const userData: firebase.User | undefined = user ? user : undefined;
      context.commit("setUserData", userData); //vuexに保存
      context.dispatch("exchange/setSelfProfile", null, { root: true }); //自分のプロフィール情報を取得
    });
  },
  async initUserDocument({ commit }, payload: { user: firebase.User; jobNumber: number }): Promise<void> { //dbのコレクションにドキュメント追加
    const job = payload.jobNumber === 0 ? "singers" : "mixers";
    const defaultProfile = job === "singers" ? DEFAULT_SINGER_DATA : DEFAULT_MIXER_DATA; //初期値
    commit("exchange/setSelfProfile", defaultProfile, { root: true }); //vuexに初期値保存

    await firebase.firestore().collection(job).doc(payload.user.uid).set({
      uid: payload.user.uid,
      ...defaultProfile
    });
  },
  setJobState({ commit }, payload: number): void { //歌い手かmixerかを０,1で受け取る
    const isSinger = payload === 0 ? true : false;
    commit("setSingerState", isSinger);

    const isMixer = !isSinger;
    commit("setMixerState", isMixer);
  },
};