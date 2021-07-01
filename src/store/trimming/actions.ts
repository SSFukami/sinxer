import { ActionTree } from "vuex";
import { ItrimmingState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export const actions: ActionTree<ItrimmingState, RootState> = {
  openTrimming({ commit }): void {
    commit("setTrimmingState", true);
  },
  closeTrimming({ commit }): void {
    commit("setTrimmingState", false);
  },
  updateImage({ commit }, payload): void {
    commit("setTrimmingImage", payload);
  },
  cropImage({ commit }, payload): void {
    commit("setCropImage", payload);
  },
  async setSelfIcon(context): Promise<void> { //自分のアイコンのプロフィール情報取得してvuexに
    const userUid: string = context.rootGetters["auth/getUserUid"];
    //ストレージのルートのリファレンスを取得
    const storageRef: any = firebase.storage().ref();
    //ストレージのルートにあるuserUid+'icon.png'のリファレンスを取得   
    const uploadRef: any = storageRef.child(userUid + 'icon.png');

    if (uploadRef != null) { //アイコンを登録してない人対策
      uploadRef.getDownloadURL().then((url: any) => {
        context.commit("setCropImage", url);
      });
    } else { //キャンセルボタンを押した時アイコンを登録してない人にはアイコンを表示しないようにする
      context.commit("setCropImage", "");
    }
  },
  async updateCropImage(context): Promise<void> {//アイコンの更新処理
    const userUid: string = context.rootGetters["auth/getUserUid"];
    //ストレージへアップロードするファイルのパスを生成する
    const storageRef = firebase.storage().ref();
    const uploadRef = storageRef.child(userUid + 'icon.png');

    //base64形式の画像保存方法
    uploadRef.putString(context.state.cropImage, 'data_url').then(function () {
      console.log('Uploaded a data_url string!');
    });
  },
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};