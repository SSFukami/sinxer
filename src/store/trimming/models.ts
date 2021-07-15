export interface ItrimmingState {
  isOpeningTrimming: boolean;
  uploadedImage: string;
  cropImage: string;
  storageSelfIcon: string;
  mixerCropImage: string;
}

export class TrimmingState implements ItrimmingState {
  isOpeningTrimming = false; //トリミングエリアが開いているときはtrue
  uploadedImage = ""; //選択した元の画像
  cropImage = ""; //トリミングした左上に表示されるアイコン
  storageSelfIcon = ""; //データベースに保存されているユーザーのアイコン
  mixerCropImage = "";//プロフィール画面などで表示するミックス師のアイコン
}