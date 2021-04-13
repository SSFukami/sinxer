import { IauthState } from "./auth/models";
import { IcommonState } from "./common/models";
import { IexchangeState } from "./exchange/models";
import { ImodalState } from "./modal/models";

export interface RootState {
    auth: IauthState;
    common: IcommonState;
    exchange: IexchangeState;
    modal: ImodalState;
};