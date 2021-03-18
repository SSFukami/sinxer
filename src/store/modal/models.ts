export interface ImodalState {
    isOpening: Boolean;
    path: String | null; //閉じてる時はnull
}

export class ModalState implements ImodalState {
    isOpening = false; //モーダルが表示されたらtrue
    path = ""; //表示中のモーダルの名前
}