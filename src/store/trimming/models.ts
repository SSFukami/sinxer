export interface ItrimmingState {
  isOpeningTrimming: boolean;
  uploadedImage: string;
  cropImage: string;
  storageSelfIcon: string;
  profileIcon: string;
  iconList: string[];
  selfIcon: string;
  clientIcon: string;
}

export class TrimmingState implements ItrimmingState {
  isOpeningTrimming = false; //トリミングエリアが開いているときはtrue
  uploadedImage = ""; //選択した元の画像
  cropImage = ""; //トリミングした左上に表示されるアイコン
  storageSelfIcon = ""; //データベースに保存されているユーザーのアイコン
  profileIcon = "";//プロフィール画面などで表示するミックス師のアイコン
  iconList = [];//プロフィール画面などで表示するアイコンのリスト
  selfIcon = "";//メッセージ画面で表示される自分のアイコン
  clientIcon = "";//メッセージ画面で表示される相手のアイコン
}