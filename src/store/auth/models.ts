import firebase from "firebase/app";

export interface IauthState {
  user: firebase.User | undefined;
  singerState: boolean;
  mixerState: boolean;
}

export class AuthState implements IauthState {
  user = undefined;
  singerState = false; //歌い手でログイン状態ならtrue
  mixerState = false;//mix師でログイン状態ならtrue
}