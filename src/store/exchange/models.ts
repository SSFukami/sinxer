import {
    IsingerData, ImixerData
  } from "@/mixins/defaultProfileData";

export type profileDataType = IsingerData | ImixerData;

export interface IexchangeState {
    selfProfileData: profileDataType | { [key: string]: string };
    clientProfileData: profileDataType | { [key: string]: string };
}

export class ExchangeState implements IexchangeState {
    selfProfileData = {}; //ユーザー自身のプロフィール情報
    clientProfileData = {}; //閲覧している他ユーザーのプロフィール情報
}