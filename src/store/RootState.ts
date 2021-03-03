import { IcommonState } from "./common/models";
import { ImodalState } from "./modal/models";
import { IauthState } from "./auth/models";

export interface RootState {
    common: IcommonState;
    modal: ImodalState;
    auth: IauthState;
};