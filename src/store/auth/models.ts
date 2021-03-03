export interface IauthState {
  user: Object
  singerState: Boolean
  mixerState: Boolean
}

export class AuthState implements IauthState {
  user = {}
  singerState = false //歌い手でログイン状態ならtrue
  mixerState = false //mix師でログイン状態ならtrue
}