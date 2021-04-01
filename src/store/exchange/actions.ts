import { ActionTree } from "vuex";
import { IexchangeState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  DEFAULT_SINGER_DATA, DEFAULT_MIXER_DATA
} from "@/mixins/defaultProfileData";

type IformData = {
  id: number;
  label: string;
  value: string;
  formType: string;
};

export const actions: ActionTree<IexchangeState, RootState> = {
  async setSelfProfile(context): Promise<void> { //dbから自分のプロフィール情報取得してvuexに
    let profileData: { [key: string]: string } = {};

    const userUid: string = context.rootGetters["auth/getUserUid"];
    const job: string = context.rootGetters["auth/getJob"];
    const defaultProfile = job === "singers" ? DEFAULT_SINGER_DATA : DEFAULT_MIXER_DATA; //キーの種類取得用

    await firebase.firestore().collection(job).doc(userUid).get()
      .then((doc) => {
        if (doc.exists) { //ログインしている場合はユーザーの情報取得
          const userDoc: firebase.firestore.DocumentData | undefined = doc.data();
          for (let k in defaultProfile) {
            profileData[k] = userDoc?.[k];
          }
        } else {
          console.log("ログアウト状態");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
    context.commit("setSelfProfile", profileData); //vuex更新
  },
  async updateProfile(context, payload: IformData[]): Promise<void> { //dbのプロフィール情報更新処理
    const defaultProfile = context.rootState.auth.singerState ? DEFAULT_SINGER_DATA : DEFAULT_MIXER_DATA; //キーの種類取得用
    let profileData: { [key: string]: string } = {};
    for (let i in payload) {
      const keyName: string = Object.keys(defaultProfile)[i];
      profileData[keyName] = payload[i].value; //更新情報をオブジェクトにまとめる
    }

    const job: string = context.rootGetters["auth/getJob"];
    const userUid: string = await context.rootGetters["auth/getUserUid"];
    await firebase.firestore().collection(job).doc(userUid).update(profileData).then(() => {
      alert("更新できました");
    }); //dbを更新

    context.dispatch("setSelfProfile"); //最後にvuex更新
  },
  error({ commit }, payload: String): void {
    commit("setErrorMessage", payload);
  },
};