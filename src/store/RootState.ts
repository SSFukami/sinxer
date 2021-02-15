import { IcommonState } from "./common/models";
import { ImodalState } from "./modal/models";

export interface RootState {
    common: IcommonState;
    modal: ImodalState;
};