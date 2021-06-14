export interface ItrimmingState {
  isOpeningTrimming: boolean;//トリミングエリアが開いているときはtrue
  uploadedImage: string;
  cropImage: string;
  forStrogeIcon: string;
  beforeUpdateImage: string;
}

export class TrimmingState implements ItrimmingState {
  isOpeningTrimming = false;
  uploadedImage = "";
  cropImage = "";
  forStrogeIcon = "";
  beforeUpdateImage = "";
}