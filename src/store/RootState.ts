import { IauthState } from "./auth/models";
import { IcommonState } from "./common/models";
import { IexchangeState } from "./exchange/models";
import { ImodalState } from "./modal/models";
import { ItrimmingState } from "./trimming/models";

export interface RootState {
    auth: IauthState;
    common: IcommonState;
    exchange: IexchangeState;
    modal: ImodalState;
    trimming: ItrimmingState;
};