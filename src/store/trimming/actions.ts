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

    const basicIconRef: any = firebase.storage().ref('basic_icon.png');

    await firebase.storage().ref(userUid + 'icon.png').getDownloadURL()
      .then((url:any) => { //uploadRefがstorageに存在する(=アイコン登録をしたことがある)時
          context.commit("setCropImage", url);
      })
      .catch(() => {
        basicIconRef.getDownloadURL().then((url: any) => {
            context.commit("setCropImage", url);
        })
      })
  },
  async updateCropImage(context): Promise<void> {//アイコンの更新処理
    const userUid: string = context.rootGetters["auth/getUserUid"];
    //ストレージへアップロードするファイルのパスを生成する
    let uploadRef = firebase.storage().ref().child(userUid + 'icon.png');

    //base64形式の画像保存方法
    uploadRef.putString(context.state.cropImage, 'data_url').then(function () {
      console.log('Uploaded a data_url string!');
    });
  },
  async getMixerIcon(context): Promise<void> {//ホーム画面でのミックス師のアイコン表示処理
    context.commit("resetIconList");
    //まずiconListを空にする
    const repetition: number = context.rootState.exchange.homeMixerList.length;
    //HomeTileの数を測定し、繰り返す回数を決める
    const homeMixerUidList: any = context.rootState.exchange.homeMixerUidList;
    //HomeTileに表示されるユーザーのidのリスト
    const mixerCropImageList: any = context.state.iconList;
    //表示するアイコンのurlを格納するリスト
    const basicIconUrl: any = "https://firebasestorage.googleapis.com/v0/b/sinxer-49d2b.appspot.com/o/basic_icon.png?alt=media&token=110e9ab6-54d6-40f4-9429-eb4a91ec1f36";
    //basic_icon.pngのurlを代入
    for (let i = 0; i < repetition; i++) {
      //HomeTileに表示するアイコンを取得する
      let homeMixerUid: string = homeMixerUidList[i];
      //HomeTileに表示されるユーザーのidを取得
      let uploadRef: any | undefined = firebase.storage().ref().child(homeMixerUid + 'icon.png');
      await uploadRef.getDownloadURL().then((url: any) => {
        //アイコンのurlとuidが一致したらそのurlをurlリストに格納
        mixerCropImageList.push(url);
      }).catch(() => {
        //一致しなかったらデフォルトのアイコンを格納
        mixerCropImageList.push(basicIconUrl);
      });
      context.commit("setIconList", mixerCropImageList);
    }
  },
  async getClientIcon(context): Promise<void> {//ユーザータブでのミックス師のアイコン表示処理
    context.commit("resetIconList");
    //まずiconListを空にする
    const repetition: number = context.rootState.exchange.clientList.length;
    // ユーザー数を測定し、繰り返す回数を決める
    const clientUidList: any = context.rootState.exchange.clientUidList;
    //ユーザーのidのリスト
    const mixerCropImageList: any = context.state.iconList;
    //表示するアイコンのurlを格納するリスト
    const basicIconUrl: any = "https://firebasestorage.googleapis.com/v0/b/sinxer-49d2b.appspot.com/o/basic_icon.png?alt=media&token=110e9ab6-54d6-40f4-9429-eb4a91ec1f36";
    //basic_icon.pngのurlを代入
    for (let i = 0; i < repetition; i++) {
      //ユーザータブに表示するアイコンを取得する
      let clientUid: string = clientUidList[i];
      //ユーザータブに表示されるユーザーのidを取得
      let uploadRef: any | undefined = firebase.storage().ref().child(clientUid + 'icon.png');
      await uploadRef.getDownloadURL().then((url: any) => {
        //アイコンのurlとuidが一致したらそのurlをurlリストに格納
        mixerCropImageList.push(url);
      }).catch(() => {
        //一致しなかったらデフォルトのアイコンを格納
        mixerCropImageList.push(basicIconUrl);
      });
    }
      context.commit("setIconList", mixerCropImageList);
  },

  async searchClientIcon(context, payload): Promise<void> {
    //メッセージ画面の会話相手のアイコンを表示する処理

    const userUid: string = context.rootGetters["auth/getUserUid"];

    const uploadRef: any | undefined = firebase.storage().ref().child(payload + 'icon.png');

    const basicIconRef: any = firebase.storage().ref('basic_icon.png');
    await uploadRef.getDownloadURL().then((url: any) => {
      context.commit("setClientIcon", url);
    }).catch(() => {
      basicIconRef.getDownloadURL().then((url: any) => {
        context.commit("setClientIcon", url);
    })
    });
  },
  async searchSelfIcon(context): Promise<void> {
    const userUid: string = context.rootGetters["auth/getUserUid"];
    const basicIconRef: any = firebase.storage().ref('basic_icon.png');
    await firebase.storage().ref(userUid + 'icon.png').getDownloadURL()
      .then((url:any) => { 
          context.commit("setSelfIcon", url);
      })
      .catch(() => {
        basicIconRef.getDownloadURL().then((url: any) => {
          context.commit("setClientIcon", url);
      })
      })
  }
};