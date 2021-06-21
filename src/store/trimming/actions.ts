import { ActionTree } from "vuex";
import { ItrimmingState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
    var storageRef: any = firebase.storage().ref();
    //ストレージのルートにあるuserUid+'icon.png'のリファレンスを取得   
    var uploadRef: any = storageRef.child(userUid + 'icon.png');

    if (uploadRef != null) {//アイコンを登録してない人対策
      uploadRef.getDownloadURL().then((url: any) => {
        context.commit("setCropImage", url);
      });
    }
  },
  async updateCropImage(context): Promise<void> {//アイコンの更新処理
    const userUid: string = context.rootGetters["auth/getUserUid"];
    //ストレージへアップロードするファイルのパスを生成する
    var storageRef = firebase.storage().ref();
    var uploadRef = storageRef.child(userUid + 'icon.png');

    //base64形式の画像保存方法
    uploadRef.putString(context.state.cropImage, 'data_url').then(function () {
      console.log('Uploaded a data_url string!');
    });
  },
  cancelUpdateImage(context){//トリミングした画像をアイコンとして保存しない処理
    const userUid: string = context.rootGetters["auth/getUserUid"];
    //ストレージのルートのリファレンスを取得
    var storageRef: any = firebase.storage().ref();
    //ストレージのルートにあるuserUid+'icon.png'のリファレンスを取得   
    var uploadRef: any = storageRef.child(userUid + 'icon.png');

    if(uploadRef == null){//アイコンを登録したことがない人は何も表示しない
      context.commit("setCropImage","");
    }else{//アイコンを登録したことがある人は一番最後に登録したアイコンを表示
      context.dispatch("setSelfIcon");
    }
  },
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};