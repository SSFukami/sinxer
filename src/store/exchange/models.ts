import {
    IsingerData, ImixerData
} from "@/mixins/defaultProfileData";

import firebase from "firebase/app";
import "firebase/firestore";

export type profileDataType = IsingerData | ImixerData;

export type messageDataType = {
    uid: string;
    time: firebase.firestore.FieldValue;
    content: string;
}

export interface IexchangeState {
    selfProfileData: profileDataType | { [key: string]: string }; //キーはdefaultProfileと同じ
    clientProfileData: profileDataType | { [key: string]: string }; //キーはdefaultProfileのキーとuid

    isShowingSinger: boolean;
    homeMixerList: profileDataType[];

    clientList: profileDataType[];
    selectedUid: string;
    messageList: messageDataType[];
}

export class ExchangeState implements IexchangeState {
    selfProfileData = {}; //ユーザー自身のプロフィール情報
    clientProfileData = {}; //閲覧している他ユーザーのプロフィール情報

    isShowingSinger = false; //歌い手のプロフィールを閲覧中ならtrue
    homeMixerList = []; //ホームに表示するMix師のリスト

    clientList = []; //チャットのやりとりをする相手のリスト
    selectedUid = ""; //開いているチャット相手のUID
    messageList = []; //選択した相手とのチャットデータのリスト
}