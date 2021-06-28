import { ActionTree } from "vuex";
import { IexchangeState } from "./models";
import { RootState } from "../RootState";

import router from '@/router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {
  DEFAULT_SINGER_DATA, DEFAULT_MIXER_DATA, ImixerData
} from "@/mixins/defaultProfileData";

type IformData = {
  id: number;
  label: string;
  option?: { min?: number; step?: number };
  value: string;
  formType: string;
};

type messageDataType = { //メッセージドキュメントの型宣言
  uid: string,
  time: firebase.firestore.FieldValue,
  content: string,
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
        } else { //アカウント情報がない場合firebaseでログアウトさせる
          context.dispatch("auth/signOut", null, { root: true });
          alert("このメールアドレスでアカウント情報が取得できませんでした");
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
    const userDocRef = firebase.firestore().collection(job).doc(userUid);
    userDocRef.update(profileData); //自身のドキュメント更新

    const clientJob: string = job === "singers" ? "mixers" : "singers"; //自分と逆の職業が相手の職業
    updateClientDoc(userDocRef, profileData, userUid, clientJob); //顧客側のドキュメントの更新

    context.dispatch("setSelfProfile"); //最後にvuex更新
  },
  async setClientProfile(context, payload: string): Promise<void> { //閲覧する他ユーザーの情報取得
    let profileData: { [key: string]: string } = { uid: payload }; //ユーザーIDを先に入れる

    const clientJob: string = context.state.isShowingSinger ? "singers" : "mixers";
    const defaultProfile = clientJob === "singers" ? DEFAULT_SINGER_DATA : DEFAULT_MIXER_DATA; //キーの種類取得用

    await firebase.firestore().collection(clientJob).doc(payload).get()
      .then((doc) => {
        if (doc.exists) { //情報が存在すれば情報取得
          const userDoc: firebase.firestore.DocumentData | undefined = doc.data();
          for (let k in defaultProfile) {
            profileData[k] = userDoc?.[k]; //ユーザーID以外の情報をここでdbから追加
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
    const mixerList: Partial<ImixerData>[] = [];
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
  async searchMixer({ commit, rootState }): Promise<void> { //検索にヒットしたMixerのデータ取得
    const searchWord = rootState.common.searchWord;
    const searchType = rootState.common.searchTypeId;

    let mixerList: Partial<ImixerData>[] = [];

    switch (searchType) {
      case 0: //名前を前方一致で検索
        await firebase.firestore().collection('mixers').orderBy('name').startAt(searchWord).endAt(searchWord + '\uf8ff').get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              mixerList.push(doc.data());
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        break;
      case 1: //料金の上限で検索
        if (typeof searchWord === "number") {
          mixerList = getHitMixer('fee', searchWord, '<');
        } else {
          alert("数字を入力して検索する必要があります");
        }
        break;
      case 2: //料金の下限で検索
        if (typeof searchWord === "number") {
          mixerList = getHitMixer('fee', searchWord, '>');
        } else {
          alert("数字を入力して検索する必要があります");
        }
        break;
      case 3: //納期の上限で検索
        if (typeof searchWord === "number") {
          mixerList = getHitMixer('deadline', searchWord, '<');
        } else {
          alert("数字を入力して検索する必要があります");
        }
        break;
      case 4: //納期の下限で検索
        if (typeof searchWord === "number") {
          mixerList = getHitMixer('deadline', searchWord, '>');
        } else {
          alert("数字を入力して検索する必要があります");
        }
        break;
    }

    console.log(mixerList, searchType, searchWord);
    commit("setHomeMixerList", mixerList); //vuexに保存
  },
  async startMessage(context, payload: ImixerData): Promise<void> { //歌い手側が依頼した時にチャット相手に追加
    const userUid: string = context.rootGetters["auth/getUserUid"];

    await firebase.firestore().collection('singers').doc(userUid).collection('clients').doc(payload.uid).set(payload)
      .then(() => {
        context.dispatch("setClientList"); //チャット相手のリストの更新
        context.commit("setSelectedUid", payload.uid) //依頼した相手とのメッセージ画面を表示させるようにする
        router.push('/message');
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async setClientList(context): Promise<void> { //firestoreからチャット相手のリストデータ取得
    const userUid: string = context.rootGetters["auth/getUserUid"];
    const job: string = context.rootGetters["auth/getJob"];

    const clientList: { [key: string]: string }[] = []; //データを格納する配列
    await firebase.firestore().collection(job).doc(userUid).collection('clients').get()
      .then((doc) => {
        doc.forEach(element => {
          clientList.push(element.data()); //取得したデータを配列に
        });
      })
      .catch((error) => {
        console.log(error);
      });

    context.commit("setClientList", clientList);
  },
  async setMessageData(context, payload: string): Promise<void> { //指定した相手とのチャットデータをdbから取得
    const userUid: string = context.rootGetters["auth/getUserUid"];
    const job: string = context.rootGetters["auth/getJob"];

    const messageList: { [key: string]: string }[] = []; //データを格納する配列
    await firebase.firestore().collection(job).doc(userUid).collection('clients').doc(payload).collection('message').orderBy('time').get() //作成時間順に取得
      .then((doc) => {
        doc.forEach(element => {
          messageList.push(element.data()); //取得したデータを配列に
        });
      })
      .catch((error) => {
        console.log(error);
      });

    context.commit("setMessageList", messageList);
  },
  async sendMessage(context, payload: string): Promise<void> { //送信したメッセージをdbに登録する処理
    const batch: firebase.firestore.WriteBatch = firebase.firestore().batch();

    const userUid: string = context.rootGetters["auth/getUserUid"]; //自分のuid
    const clientUid: string = context.state.selectedUid; //送る相手のuid
    const messageDoc: messageDataType = { uid: userUid, time: firebase.firestore.FieldValue.serverTimestamp(), content: payload }; //保存するメッセージデータ

    //自分のドキュメント下での更新
    const job: string = context.rootGetters["auth/getJob"];
    const userMessageRef = firebase.firestore().collection(job).doc(userUid).collection('clients').doc(clientUid).collection('message').doc(); //データを保存するドキュメント先
    batch.set(userMessageRef, messageDoc); //ドキュメントセット

    //相手側のドキュメント下に保存
    const clientJob: string = job === "singers" ? "mixers" : "singers"; //自分と逆の職業が相手の職業
    const clientUserRef = firebase.firestore().collection(clientJob).doc(clientUid).collection('clients').doc(userUid);
    const clientMessageRef = clientUserRef.collection('message').doc(); //データを保存するドキュメント先
    batch.set(clientMessageRef, messageDoc); //ドキュメントセット

    if (context.state.messageList.length === 0) { //最初のチャットの場合、自分のデータを相手側の顧客リストに追加
      const profileData = context.state.selfProfileData;
      batch.set(clientUserRef, { uid: userUid, ...profileData });
    }

    await batch.commit();

    context.dispatch("setMessageData", clientUid); //チャット相手とのチャットデータの更新
  },
  startMessageListener(context, payload: string): void { //チャットを開いた時リスナー起動
    const userUid: string = context.rootGetters["auth/getUserUid"]; //自分のuid
    const job: string = context.rootGetters["auth/getJob"]; //自分の職業

    const unsubscribe = firebase.firestore().collection(job).doc(userUid).collection('clients').doc(payload).collection('message').where('uid', '==', payload) //相手側の発言をリスナー
      .onSnapshot(() => {
        context.dispatch("setMessageData", payload); //変更があればdbからメッセージ内容取得
      });

    context.commit("setUnsubscribe", unsubscribe); //停止のために処理をstateに登録
  },
  stopMessageListener({ state, commit }): void { //チャットを閉じた時リスナー停止
    const unsubscribe = state.unsubscribe;
    unsubscribe(); //リスナーの停止

    commit("setUnsubscribe", () => { }); //処理初期化
  },
  error({ commit }, payload: string): void {
    commit("setErrorMessage", payload);
  },
};

function getSortField(): string { //ソートするMix師のフィールドをランダムに決定
  const defaultMixerData = DEFAULT_MIXER_DATA;
  const fieldList: string[] = [...Object.keys(defaultMixerData), "uid"];
  const randomNum: number = Math.floor(Math.random() * fieldList.length);
  return fieldList[randomNum];
}

function getHitMixer(field: string, searchWord: number, type: '<' | '>'): Partial<ImixerData>[] {
  const mixerList: Partial<ImixerData>[] = [];
  firebase.firestore().collection('mixers').where(field, type, searchWord).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        mixerList.push(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return mixerList;
}

function updateClientDoc(userDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>, profileData: { [key: string]: string }, userUid: string, clientJob: string): void { //顧客側のドキュメント下の更新
  userDocRef.collection('clients').get()
    .then((doc) => {
      doc.forEach(element => {
        //顧客ごとにチャットがあるか確認
        element.ref.collection('message').limit(1).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data()) { //チャットがある場合のみ更新処理
                const clientDocRef = firebase.firestore().collection(clientJob).doc(element.data().uid).collection('clients').doc(userUid);
                clientDocRef.update(profileData); //顧客側のドキュメント下の更新
              }
            });
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}