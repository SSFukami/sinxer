export interface ItrimmingState {
  isOpeningTrimming: boolean;
  uploadedImage: string;
  cropImage: string;
  forStrogeIcon: string;
  beforeUpdateImage: string;
}

export class TrimmingState implements ItrimmingState {
  isOpeningTrimming = false; //トリミングエリアが開いているときはtrue
  uploadedImage = ""; //選択した元の画像
  cropImage = ""; //トリミングした左上に表示されるアイコン
  forStrogeIcon = ""; //
  beforeUpdateImage = ""; //
}