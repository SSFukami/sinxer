import { ActionTree } from "vuex";
import { IexchangeState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

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
  async setClientProfile(context, payload: string): Promise<void> { //閲覧する他ユーザーの情報取得
    let profileData: { [key: string]: string } = {};

    const clientJob: string = context.state.isClientSinger ? "singers" : "mixers";
    const defaultProfile = clientJob === "singers" ? DEFAULT_SINGER_DATA : DEFAULT_MIXER_DATA; //キーの種類取得用

    await firebase.firestore().collection(clientJob).doc(payload).get()
      .then((doc) => {
        if (doc.exists) { //情報が存在すれば情報取得
          const userDoc: firebase.firestore.DocumentData | undefined = doc.data();
          for (let k in defaultProfile) {
            profileData[k] = userDoc?.[k];
          }
          router.push('/profile');
        } else {
          alert("正しく情報が取得できませんでした。アカウントが既に削除されている可能性があります。");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    context.commit("setClientProfile", profileData); //vuex更新
  },
  async setHomeTile({ commit }): Promise<void> {
    const field: string = getSortField();
    const random: number = Math.random();
    const mixerList: { [key: string]: string }[] = [];
    if (random < 0.5) { //半分の確率
      await firebase.firestore().collection("mixers").orderBy(field).limit(12).get() //上から12人分取得
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            mixerList.push(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      await firebase.firestore().collection("mixers").orderBy(field, "desc").limit(12).get() //下から12人分取得
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            mixerList.push(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }

    commit("setHomeMixerList", mixerList); //vuexに保存
  },
  error({ commit }, payload: String): void {
    commit("setErrorMessage", payload);
  },
};

function getSortField(): string { //ソートするMix師のフィールドをランダムに決定
  const defaultMixerData = DEFAULT_MIXER_DATA;
  const fieldList: string[] = [...Object.keys(defaultMixerData), "uid"];
  const randomNum: number = Math.floor(Math.random() * fieldList.length);
  return fieldList[randomNum];
}